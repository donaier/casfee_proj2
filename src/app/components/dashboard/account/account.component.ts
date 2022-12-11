import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  accounts: Account[] = [];
  selectedAccount?: Account;
  data : string = 'noentry'
  private subscription: Subscription[] = [];

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore){}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))
    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length > 0) {
        this.data = 'data'
        this.accounts = data;
      }
      if (data.length === undefined) {
        this.data = 'isloading'
      }
      if (data.length === 0) {
        this.data = 'nodata'
        this.accounts = [];
      }
    }))
  }

  openManualTransactionModal(account: Account) {
    this.selectedAccount = account;
    document.getElementById('manual-transaction-form')?.classList.add('is-active');
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
