import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { ManualTransactionFormComponent } from './manual-transaction-form/manual-transaction-form.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  @ViewChild('manualTransactionModal') manualTransactionModal!: ManualTransactionFormComponent

  public accounts: Account[] = [];
  public selectedAccount?: Account;

  private subscription: Subscription[] = [];

  constructor(
    @Inject(fluxDispatcherToken)
    private dispatcher: Subject<FluxAction>,
    public store: FluxStore
  ) { }

  ngOnInit(): void {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))
    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data;
      }
    }))
  }

  openManualTransactionModal(account: Account) {
    this.selectedAccount = account;
    this.manualTransactionModal.modal.nativeElement.classList.add('is-active')
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
