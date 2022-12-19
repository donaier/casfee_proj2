import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account, AccountForm, AccountColors, csvMask, calculateCurrentValue } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnChanges {
  @ViewChild('modal', { static: false }) modal!: ElementRef

  @Input() account: Account | undefined
  @Input() selector: string | undefined
  csvMasks: csvMask[] | undefined
  subscription : Subscription | undefined

  accountColors = AccountColors
  accountForm!: FormGroup
  name!: FormControl
  shortName!: FormControl
  description!: FormControl
  initialValue!: FormControl
  color!: FormControl
  csv!: FormControl

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) { }

  ngOnInit(){
    this.accountForm = new FormGroup({
      name: this.name = new FormControl(''),
      shortName: this.shortName = new FormControl(''),
      description: this.description = new FormControl(''),
      initialValue: this.initialValue = new FormControl(''),
      color: this.color = new FormControl(''),
      csv: this.csv = new FormControl(''),
    })
    this.subscription = this.store.CsvMasks.subscribe((data) => {
      if (data.length) {
        this.csvMasks = data;
      }
      if(data.length === 0){
        this.csvMasks = []
      }
    })
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active');
  }

  submitAccountForm(e: Event) {
    e.preventDefault();
    if(this.accountForm.valid) {
      let account = this.accountForm.value

      if (this.account) {
        // edit
        account.transactions = this.account.transactions || []
        account.currentValue = Number(calculateCurrentValue(account))
      } else {
        // create
        account.currentValue = this.initialValue.value
        account.transactions = []
      }
      this.dispatcher.next(new FluxAction(FluxActionTypes.Create,'account', null, null, null, account))
      this.hideModal()
    }
  }

  deleteAccount(){
    this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'account', null, null, null, this.account))
    this.hideModal();
  }

  ngOnChanges(): void {
    if (this.account) {
      this.accountForm?.patchValue(this.account!)
    } else {
      this.accountForm?.reset()
    }
  }
}
