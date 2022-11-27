import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account, csvMask } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { CategoryGroup } from 'src/app/shared/types/category';


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit, OnDestroy {

  private subscription: Subscription[] = [];

  accounts: Account[] = [];
  csvMasks: csvMask[] = [];
  categoryGroups: CategoryGroup[] = [];

  constructor(
    @Inject(fluxDispatcherToken)
    private dispatcher: Subject<FluxAction>,
    public store: FluxStore
  ) {}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))

    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data;
      }
    }))
    this.subscription.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
    }))

    // fake
    this.csvMasks = [
      {
        name: 'postFinance',
        delimiter: ';',
        mask: ';date;;info;;;amount;'
      },
      {
        name: 'kantonalbank',
        delimiter: ';',
        mask: ';date;;info;;;amount;'
      }
    ]
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
