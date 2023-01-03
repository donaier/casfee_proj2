import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { DATE_FORMAT, Transaction } from 'src/app/shared/types/transaction';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('DetailTransactionModal') DetailTransactionModal!: TransactionFormComponent
  @Input() accounts: Account[] = []
  @Input() selectedTimes: string[] = []

  private subscriptions: Subscription[] = [];

  allTransactions: Transaction[] = []
  allCategories: Category[] = []
  allCategoryGroups: CategoryGroup[] = []
  selectedtransaction: Transaction | undefined

  activeMonths: Set<string> = new Set

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
  public store: FluxStore,
  private utilityService: UtilityService) {}

  ngOnInit() {
    this.subscriptions.push(this.store.Categories.subscribe((data) => {
      if (data.length) {
        this.allCategories = data
      }
    }))
    this.subscriptions.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length) {
        this.allCategoryGroups = data
      }
    }))
  }

  openModal(transaction : Transaction){
    this.selectedtransaction = transaction
    this.selectedtransaction.categoryName = this.categoryNameFor(this.selectedtransaction)
   // this.manualTransactionModal.manualtransactionform.nativeElement.classList.add('is-active')
    this.DetailTransactionModal.modaltransaction.nativeElement.classList.add('is-active')
  }

  categoryNameFor(transaction: Transaction) {
    return this.allCategories.find(cat => cat.id === transaction.categoryId)?.name
  }

  colorFor(transaction: Transaction) {
    return this.allCategoryGroups.find(cg => {
      return cg.id === (this.allCategories.find(c => c.id === transaction.categoryId)?.group_id)
    })?.color
  }


  deletetransaction(transaction : Transaction){
    this.accounts.forEach(account => {
      let account_update : Account
      if(account.name === transaction.accountName){
        account.transactions = account.transactions.filter(tran => tran.id !== transaction.id)
        account_update = account
        account_update.currentValue = Number(this.utilityService.calculateCurrentValue(account))
        this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, account_update))
      }
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.allTransactions = []
    this.accounts.forEach(account => {
      let tempTransactions: Transaction[] = [...account.transactions];
      tempTransactions.map(t => {
        t.accountName = account.name
        t.accountShortName = account.shortName
        t.date = t.date
      })
      this.allTransactions.push(...tempTransactions)
    })
    this.allTransactions = this.allTransactions.filter(t => this.selectedTimes.some((times => t.date.includes(times))))
    this.allTransactions.sort((a,b) => Date.parse(moment(b.date, DATE_FORMAT).toString()) - Date.parse(moment(a.date, DATE_FORMAT).toString()))
    this.activeMonths = new Set(this.allTransactions.map(t => moment(t.date, DATE_FORMAT).format('M.Y')))
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {subscription.unsubscribe()})
  }
}
