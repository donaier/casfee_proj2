import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent implements OnInit, OnDestroy {

  accounts: Account[] = []
  subscription : Subscription | undefined
  public accountForForm?: Account

  constructor(public store: FluxStore) {}

  ngOnInit() {
    this.subscription = this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data;
      }
    })
  }

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

  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }





}
