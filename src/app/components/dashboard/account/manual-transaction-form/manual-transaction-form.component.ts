import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { DATE_FORMAT, Transaction } from 'src/app/shared/types/transaction';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-manual-transaction-form',
  templateUrl: './manual-transaction-form.component.html',
  styleUrls: ['./manual-transaction-form.component.scss']
})
export class ManualTransactionFormComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('manualtransactionform', { static: false }) manualtransactionform!: ElementRef
  @ViewChildren('selectabletags') selectabletags!: QueryList<ElementRef>
  @Input() account?: Account;

  transactionForm!: FormGroup
  description!: FormControl
  fromAccount!: FormControl
  amount!: FormControl
  date!: FormControl
  categoryId!: FormControl

  categoryGroups: CategoryGroup[] = []
  categories: Category[] = []
  category: Category | undefined
  newTransaction : Transaction | undefined
  private subscriptions : Subscription[] = []

  constructor(public store: FluxStore,
   @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
   private utilityService: UtilityService) {}

  ngOnInit(){
    this.subscriptions.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
      if(data.length === 0){
        this.categoryGroups = []
      }
    }))
    this.subscriptions.push(this.store.Categories.subscribe((data) => {
      if (data.length) {
        this.categories = data
        this.categoryGroups = this.utilityService.checkavailableCategories(this.categoryGroups, data)
      }
    }))

    this.transactionForm = new FormGroup({
      description: this.description = new FormControl(''),
      fromAccount: this.fromAccount = new FormControl(''),
      amount: this.amount = new FormControl(''),
      date: this.date = new FormControl(''),
      categoryId: this.categoryId = new FormControl('')
    })
  }

  hideModal() {
    this.manualtransactionform.nativeElement.classList.remove('is-active');
    this.removeActiveTag()
    this.transactionForm.reset();
  }

  removeActiveTag(){
    this.selectabletags.forEach(tag => { tag.nativeElement.classList.remove('selected')});
  }

  setCategory(category: Category, e : Event) {
    this.removeActiveTag()
    this.transactionForm.get('categoryId')?.setValue(category.id);
    (<HTMLElement>e.target).classList.add('selected')
  }

  submitTransactionForm(e: Event) {
    e.preventDefault();

    if(this.transactionForm.valid && this.transactionForm.dirty) {
      let account = this.account!
      let transaction: Transaction = this.transactionForm.value
      transaction.date = moment(this.transactionForm.get('date')?.value).format(DATE_FORMAT)
      transaction.id = uuidv4()
      account.transactions.push(transaction)
      account.currentValue = Number(this.utilityService.calculateCurrentValue(account))
      this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, account))
      this.hideModal()
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }
}
