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
  @Input() account?: Account
  @Input() csvMasks?: csvMask[]

//  accountForm: FormGroup = new FormGroup(AccountForm);

  accountColors = AccountColors
  modalTitle: string = 'create new Account'

  accountForm!: FormGroup
  name!: FormControl
  shortname!: FormControl
  description!: FormControl
  initialValue!: FormControl
  color!: FormControl
  csv!: FormControl

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>) { }

  ngOnInit(){
   this.accountForm = new FormGroup({
    name: this.name = new FormControl(''),
    shortname: this.shortname = new FormControl(''),
    description: this.description = new FormControl(''),
    initialValue: this.initialValue = new FormControl('', [Validators.required, Validators.pattern('/^[0-9]\d*$/')]),
    color: this.color = new FormControl(''),
    csv: this.csv = new FormControl(''),
   })
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active');
    this.accountForm.reset();
  }

  submitAccountForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();
    console.log(this.accountForm.value)

   // this.dispatcher.next(new FluxAction(FluxActionTypes.AddAccount, null, null, null))

    if(this.accountForm.valid) {
    //  this.accountForm.value.currentValue = this.accountForm.value.initialValue
      console.log(this.accountForm.value)
      // store or create
     //
      form.resetForm();
      this.accountForm.reset();
      this.accountForm.markAsUntouched();
   //   this.hideModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']?.currentValue?.name) {
      this.accountForm.patchValue(changes['account'].currentValue)
      this.modalTitle = 'edit'
    }
  }
}
