import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Account } from 'src/app/shared/types/account';
import { TransactionForm } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-manual-transaction-form',
  templateUrl: './manual-transaction-form.component.html',
  styleUrls: ['./manual-transaction-form.component.scss']
})
export class ManualTransactionFormComponent{

  @Input() account?: Account;
  public transactionForm: FormGroup = new FormGroup(TransactionForm);

  constructor() { }

  hideModal() {
    document.getElementById('manual-transaction-form')?.classList.remove('is-active');
    this.transactionForm.reset();
  }

  submitTransactionForm(e: Event, form: FormGroupDirective) {

  }

}
