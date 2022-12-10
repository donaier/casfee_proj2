import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { Account, AccountForm, AccountColors, csvMask } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnChanges {
  @ViewChild('modal', { static: false }) modal!: ElementRef

  @Input() account: Account | undefined
  @Input() csvMasks: csvMask[] | undefined
  @Input() selector: string | undefined

  accountColors = AccountColors
  accountForm!: FormGroup
  name!: FormControl
  shortName!: FormControl
  description!: FormControl
  initialValue!: FormControl
  color!: FormControl
  csv!: FormControl

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>) { }

  ngOnInit(){
   this.accountForm = new FormGroup({
    name: this.name = new FormControl(''),
    shortName: this.shortName = new FormControl(''),
    description: this.description = new FormControl(''),
    initialValue: this.initialValue = new FormControl(''),
    color: this.color = new FormControl(''),
    csv: this.csv = new FormControl(''),
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
        // todo account.currentValue ausrechnen
        account.currentValue = 0
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

  // editAccount(){
  //   if(this.accountForm.valid) {
  //     this.deleteAccount()
  //     let account = this.accountForm.value
  //     account.currentValue = this.account?.currentValue
  //     this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, account))
  //   }
  //   this.accountForm.reset();
  //   this.hideModal();
  // }

  ngOnChanges(): void {
    if (this.account) {
      this.accountForm?.patchValue(this.account!)
    } else {
      this.accountForm?.reset()
    }
  }
}
