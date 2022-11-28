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
export class ConfigurationComponent implements OnInit {

  accounts: Account[] = [];
  csvMasks: csvMask[] = [];
  categoryGroups: CategoryGroup[] = [];

  constructor(
    @Inject(fluxDispatcherToken)
    private dispatcher: Subject<FluxAction>,
  ) {}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))

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

}
