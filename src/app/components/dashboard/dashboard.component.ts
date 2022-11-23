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

  private subscription: Subscription[] = [];   // Alle Subscribers werden hier abgespeichert, wichtig fuers unsubscriben.

  accounts: Account[] = [];

  constructor(
    @Inject(fluxDispatcherToken)
    private dispatcher: Subject<FluxAction>,
    public store: FluxStore
  ) {}

  ngOnInit() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))     // Hier wird eigentlich der Store initialisiert -> mit load werden die Accounts , Transactions und Categorien von der Datenbank auf die Observables geladen.
    this.subscription.push(this.store.Accounts.subscribe((data) => {  // Fuer Testversuche habe ich eine regristrierung auf den Account_Bus gemacht
      if (data.length) {
        this.accounts = data
      }
    }))
    this.subscription.push(this.store.Transactions.subscribe((data) => {
      if (data.length > 0) {
          console.log(data)
      }
    }))
    this.subscription.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
          console.log(data)
      }
    }))
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
