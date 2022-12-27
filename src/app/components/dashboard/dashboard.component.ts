import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  accounts: Account[] = []
  activeAccounts: Account[] = []

  private subscription: Subscription[] = [];

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore){}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))
    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length > 0) {
        this.accounts = data
        this.activeAccounts = data
      }
    }))
  }

  toggleAccount(account: Account) {
    if (this.activeAccounts.includes(account)) {
      this.activeAccounts = this.activeAccounts.filter(a => a != account)
    } else {
      this.activeAccounts = [...this.activeAccounts, account]
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
