import { Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';

import { FluxStore } from 'src/app/shared/services/flux-store';
import { UtilityService } from 'src/app/shared/services/utility.service';
import { Account } from 'src/app/shared/types/account';

import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { Transaction } from 'src/app/shared/types/transaction';

import * as moment from 'moment';
import { DATE_FORMAT } from 'src/app/shared/types/transaction';



@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnChanges{
  @ViewChild('modaltransaction') modaltransaction!: ElementRef
  @ViewChild('CategoryName') CategoryName!: ElementRef
  @ViewChild('dateinput') dateinput!: ElementRef
  @ViewChildren('selectabletags') selectabletags!: QueryList<ElementRef>
  @Input() transaction?: Transaction
  @Input() categoryGroups?: CategoryGroup[]
  @Input() categories?: Category[]

  showCategoriesFlag : boolean = false
  account : Account | undefined

  transactionForm!: FormGroup
  id!: FormControl
  description!: FormControl
  date!: FormControl
  categoryName!: FormControl
  amount!: FormControl
  categoryId!: FormControl

  constructor(public store: FluxStore,
  @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
  private utilityService: UtilityService) {}

  ngOnInit(){
    this.transactionForm = new FormGroup({
      id: this.id = new FormControl(''),
      description: this.description = new FormControl(''),
      date: this.date = new FormControl(''),
      categoryName: this.categoryName = new FormControl(''),
      amount: this.amount = new FormControl('', [
        Validators.required,
        Validators.maxLength(100000000)
      ]),
      categoryId: this.categoryId = new FormControl('')
    })
  }

  getAccountforTransaction() {
    this.store.Accounts.getValue().forEach(account =>{
      if(account.name === this.transaction!.accountName){
        this.account = account
      }
    })
  }

  UpdateAccount(){
    this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, this.account!))
  }

  filterchangedTransaction(){
    this.account!.transactions = this.account!.transactions.filter(tran => tran.id !== this.transaction!.id)
  }

  deletetransaction(){
    this.getAccountforTransaction()
    this.filterchangedTransaction()
    this.account!.currentValue = Number(this.utilityService.calculateCurrentValue(this.account!))
    this.UpdateAccount()
    this.hideModal()
  }

  showCategories(){
    this.showCategoriesFlag = !this.showCategoriesFlag
  }

  setCategory(category : Category, e:Event){
    this.removeActiveTag()
    this.transactionForm.value.categoryId = category.id
    this.CategoryName.nativeElement.value = category.name;
    let target = e.target as HTMLElement
    target.classList.add('selected')
  }

  removeActiveTag(){
    this.selectabletags.forEach(tag => { tag.nativeElement.classList.remove('selected')});
  }

  updateTransaction(){

    if(this.transactionForm.valid){
      if(this.transactionForm.value.categoryName === undefined){
        this.transactionForm.value.categoryName = null
      }
      this.getAccountforTransaction()
      this.filterchangedTransaction()
      let transaction : Transaction = this.transactionForm.value
      transaction.date = moment(this.transactionForm.get('date')?.value).format(DATE_FORMAT)
      this.account!.transactions.push(transaction)

      if(this.transaction?.amount !== this.transactionForm.value.amount){
        this.account!.currentValue = Number(this.utilityService.calculateCurrentValue(this.account!))
      }

      this.UpdateAccount()
    }
    this.hideModal()
  }

  hideModal() {
    this.modaltransaction.nativeElement.classList.remove('is-active')
    this.removeActiveTag()
    this.showCategoriesFlag = false
  }

  ngOnChanges() {


    if (this.transaction) {
    //  this.transaction.date = this.convertDate(this.transaction.date)

    //  this.convertDate(this.transaction);

    //  this.dateinput.nativeElement.value = "2014-02-11"
   // 28.12.2022
    //  let date = this.transaction.date
    //  date = moment(this.transaction.date, "DD.MM.YYYY").format('YYYY-MM-DD')

      this.dateinput.nativeElement.value = moment(this.transaction.date, "DD.MM.YYYY").format('YYYY-MM-DD');



      this.CategoryName.nativeElement.value = this.transaction.categoryName

      this.transactionForm?.patchValue(this.transaction)

    }
  }

  convertDate(transaction : Transaction){

  //  console.log(transaction.date);

    transaction.date = moment(transaction.date, "DD.MM.YYYY").format('YYYY-MM-DD');

   // console.log(date)

    // In work updat soon

    // = moment(date).format(DATE_FORMAT)
    // 2023-01-07
  //  console.log(transaction);

  }



}
