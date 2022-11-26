import { Component, Input, OnInit } from '@angular/core';
import { Account } from 'src/app/shared/types/account';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent {
  
  @Input() accounts: Account[] = []

  public accountForForm?: Account

  constructor() {}

  createAccount() {
    this.accountForForm = undefined
    document.getElementById('bank-account-form')?.classList.add('is-active');
  }

  editAccount(account: Account) {
    this.accountForForm = account
    document.getElementById('bank-account-form')?.classList.add('is-active');
  }

  deleteAccount(account: Account) {
    console.log('account delete')
  }
}
