import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { DATE_FORMAT, ListTransaction, Transaction } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() accounts: Account[] = []
  @Input() selectedTimes: string[] = []

  private subscriptions: Subscription[] = [];

  allTransactions: ListTransaction[] = []
  allCategories: Category[] = []
  allCategoryGroups: CategoryGroup[] = []
  allAccounts: Account[] = []

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
    this.subscriptions.push(this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.allAccounts = data
      }
    }))
  }

  categoryNameFor(transaction: ListTransaction) {
    if (transaction.categoryId !== 'ACCOUNT_TRANSFER') {
      return this.allCategories.find(cat => cat.id === transaction.categoryId)?.name
    } else {
      let transferIndicator: string = ''
      if (transaction.amount > 0) {
        transferIndicator += 'from '
      } else {
        transferIndicator += 'to '
      }
      transferIndicator += this.allAccounts.find(acc => acc.id === transaction.fromAccount)?.name

      return transferIndicator
    }
  }

  colorFor(transaction: Transaction) {
    if (transaction.categoryId !== 'ACCOUNT_TRANSFER') {
      return this.allCategoryGroups.find(cg => {
        return cg.id === (this.allCategories.find(c => c.id === transaction.categoryId)?.group_id)
      })?.color
    } else {
      return this.allAccounts.find(acc => acc.id === transaction.fromAccount)?.color
    }
  }

  deletetransaction(transaction : ListTransaction){
    this.accounts.forEach(account => {
      let account_update : Account;
      if(account.name === transaction.accountName){
       // console.log(account.transactions)
        account.transactions = account.transactions.filter(tran => {
          //  && tran.date !== transaction.date ???
          if(tran.description !== transaction.description && tran.amount !== transaction.amount){
           return true
          }else{
            return false
          }
        })
       // console.log(account.transactions)
        account_update = account
        account_update.currentValue = Number(this.utilityService.calculateCurrentValue(account))
        this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, account_update))
      }
    })
  }



  ngOnChanges(changes: SimpleChanges) {
    this.allTransactions = []

    this.accounts.forEach(account => {
      let tempTransactions: ListTransaction[] = [...account.transactions];
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
