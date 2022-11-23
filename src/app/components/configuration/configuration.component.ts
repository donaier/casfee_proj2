import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  accounts: Account[] = [];

  constructor(
    @Inject(fluxDispatcherToken)
    private dispatcher: Subject<FluxAction>,
    public store: FluxStore
  ) {}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))

    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data
      }
    }))
  }

  // this will be in its own component later on -> accountConfig
  showAccountForm(account?: Account) {
    if (account) {
      console.log('account edit (fill form)')
    } else {
      console.log('account create (blank form)')
    }
  }
  deleteAccount(account: Account) {
    console.log('account delete')
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
