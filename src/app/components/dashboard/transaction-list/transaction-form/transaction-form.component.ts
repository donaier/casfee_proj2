import { Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';

import { FluxStore } from 'src/app/shared/services/flux-store';

import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Transaction } from 'src/app/shared/types/transaction';



@Component({
  selector: 'app-transaction-form',
  templateUrl: './transaction-form.component.html',
  styleUrls: ['./transaction-form.component.scss']
})
export class TransactionFormComponent implements OnInit, OnChanges{
  @ViewChild('modaltransaction') modaltransaction!: ElementRef
  @ViewChild('CategoryName') CategoryName!: ElementRef

  @Input() transaction?: Transaction

  transactionForm!: FormGroup
  id!: FormControl
  description!: FormControl
  date!: FormControl
  categoryName!: FormControl
  amount!: FormControl

  constructor(public store: FluxStore,
   @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>) {}




  ngOnInit(){
    this.transactionForm = new FormGroup({
      id: this.id = new FormControl(''),
      description: this.description = new FormControl(''),
      date: this.date = new FormControl(''),
      categoryName: this.categoryName = new FormControl(''),
      amount: this.amount = new FormControl(''),
    })

  }

  deletetransaction(){

  }



  hideModal() {
    this.modaltransaction.nativeElement.classList.remove('is-active')
   // this.manualtransactionform.nativeElement.classList.remove('is-active');
  //  this.removeSelectedTags()
  //  this.transactionForm.reset();
  }

  ngOnChanges() {
    console.log(this.transaction)
    if (this.transaction) {
      this.CategoryName.nativeElement = this.transaction.categoryName
      this.transactionForm?.patchValue(this.transaction)
    }
  }


}
