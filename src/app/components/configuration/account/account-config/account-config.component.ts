import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account, csvMask } from 'src/app/shared/types/account';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent implements OnInit, OnDestroy {

  accounts: Account[] = []
  subscriptions : Subscription[] = []
  csvMasks : csvMask[] = []
  accountForForm?: Account

  constructor(public store: FluxStore) {}

  ngOnInit() {
    this.subscriptions.push(this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data;
      }
    }))
    this.subscriptions.push(this.store.CsvMasks.subscribe((data) => {
      if (data.length) {
        this.csvMasks = data;
      }
    }))
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
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

}
