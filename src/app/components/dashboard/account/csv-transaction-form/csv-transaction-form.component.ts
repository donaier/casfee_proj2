import { Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account, csvMask } from 'src/app/shared/types/account';
import { FluxAction } from 'src/app/shared/types/actions.type';
import { CategoryGroup } from 'src/app/shared/types/category';
import { cookTransactions, resolveCsvMask, Transaction } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-csv-transaction-form',
  templateUrl: './csv-transaction-form.component.html',
  styleUrls: ['./csv-transaction-form.component.scss']
})
export class CsvTransactionFormComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('modal') modal!: ElementRef
  @ViewChild('csvInput') csvInput!: ElementRef
  @ViewChild('csvInputControl') csvInputControl!: ElementRef
  @ViewChild('categoryColumns') categoryColumns!: ElementRef
  @ViewChild('csvInfo') csvInfo!: ElementRef
  @ViewChild('csvReset') csvReset!: ElementRef

  @ViewChild('accountIsReady') accountIsReadyElement!: ElementRef
  @ViewChild('accountNotReady') accountNotReadyElement!: ElementRef

  @Input() account?: Account;

  private subscription : Subscription[] = []
  categoryGroups: CategoryGroup[] = []
  csvMasks: csvMask[] = []
  activeCsvMask: csvMask | undefined
  transactionsToCategorize: Transaction[] = []

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) {}

  ngOnInit(){
    this.subscription.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
    }))
    this.subscription.push(this.store.CsvMasks.subscribe((data) => {
      if (data.length > 0) {
        this.csvMasks = data;
      }
    }))
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active')
    this.resetForm()
  }

  resetForm() {
    this.csvInput.nativeElement.value = ''
    this.csvInfo.nativeElement.innerHTML = ''
    this.csvInput.nativeElement.removeAttribute('disabled')
    this.csvInputControl.nativeElement.classList.remove('is-loading')
    this.csvInputControl.nativeElement.classList.remove('is-hidden')
    this.csvReset.nativeElement.classList.add('is-hidden')
    this.categoryColumns.nativeElement.classList.add('is-hidden')
  }

  computeCsvData(e: Event) {
    let msgEvent = e as MessageEvent;
    let transactions = msgEvent.data.split(/\r?\n/);

    this.csvInputControl.nativeElement.classList.add('is-loading')
    this.csvInput.nativeElement.setAttribute('disabled', 'disabled')

    this.transactionsToCategorize = cookTransactions(transactions, this.activeCsvMask!)

    if (this.transactionsToCategorize.length) {
      this.csvInfo.nativeElement.innerHTML = this.transactionsToCategorize.length + ' transactions found to categorize'
      this.csvInfo.nativeElement.innerHTML += '<br>(' + transactions.length + ' lines in the csv)'
      this.csvInputControl.nativeElement.classList.add('is-hidden')
      this.categoryColumns.nativeElement.classList.remove('is-hidden')

      console.log(this.transactionsToCategorize)
      // advance to next step
    } else {
      this.csvInfo.nativeElement.innerHTML = 'no usable transactions found'
      this.csvReset.nativeElement.classList.remove('is-hidden')
    }
  }

  addCategory(category: CategoryGroup) {
    // here is subcategory creation on the fly
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['account'].currentValue) {
      this.activeCsvMask = this.csvMasks.find(m => m.name === this.account?.csv)
  
      if(this.activeCsvMask !== undefined && resolveCsvMask(this.activeCsvMask!)) {
        this.accountIsReadyElement.nativeElement.classList.remove('is-hidden')
        this.accountNotReadyElement.nativeElement.classList.add('is-hidden')
      } else {
        this.accountIsReadyElement.nativeElement.classList.add('is-hidden')
        this.accountNotReadyElement.nativeElement.classList.remove('is-hidden')
      }
    }
  }

  ngOnDestroy() {
    this.subscription?.forEach((subscription) => {subscription.unsubscribe()})
  }
}
