import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Account, AccountForm, AccountColors } from 'src/app/shared/types/account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnChanges {

  @Input() account?: Account

  public accountForm: FormGroup = new FormGroup(AccountForm);
  public accountColors = AccountColors
  public modalTitle: string = 'create'

  constructor() { }

  hideModal() {
    document.getElementById('bank-account-form')?.classList.remove('is-active');
    this.accountForm.reset();
  }

  submitAccountForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    console.log(this.accountForm)

    if (this.accountForm.valid && this.accountForm.dirty) {
      
      // store or create

      form.resetForm();
      this.accountForm.reset();
      this.accountForm.markAsUntouched();

      this.hideModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['account']?.currentValue?.name) {
      this.accountForm.patchValue(changes['account'].currentValue)
      this.modalTitle = 'edit'
    }
  }

}
