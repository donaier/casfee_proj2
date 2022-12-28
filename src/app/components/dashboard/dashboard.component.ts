import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { relativeTimeThreshold } from 'moment';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { TransactionService } from 'src/app/shared/helpers/transaction.service';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  constructor(
    @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>,
    private transactionService: TransactionService,
    public store: FluxStore,
    @Inject(DOCUMENT) private document: Document
    ){}

  set_Theme(){
    this.document.body.classList.add('has-navbar-fixed-top', 'dark-theme')
  }

  accounts: Account[] = []
  activeAccounts: Account[] = []

  groupedMonths: any[] = []
  selectedTimeframe: string = 'years'
  selectedTime: any[] = []

  private subscription: Subscription[] = [];

  ngOnInit() {
    this.set_Theme()
    this.dispatcher.next(new FluxAction(FluxActionTypes.Load))
    this.subscription.push(this.store.Accounts.subscribe((data) => {
      if (data.length > 0) {
        this.accounts = data
        this.activeAccounts = data
        this.groupedMonths = this.transactionService.extractMonths(this.activeAccounts)
        this.toggleTimeframe()
      }
    }))
  }

  toggleAccount(account: Account) {
    if (this.activeAccounts.includes(account)) {
      this.activeAccounts = this.activeAccounts.filter(a => a != account)
    } else {
      this.activeAccounts = [...this.activeAccounts, account]
    }
    this.groupedMonths = this.transactionService.extractMonths(this.activeAccounts)
  }

  toggleYear(year: string) {
    if (this.selectedTimeframe === 'years') {
      if (this.selectedTime.includes(year)) {
        this.selectedTime = this.selectedTime.filter(y => y != year)
      } else {
        this.selectedTime = [...this.selectedTime, year]
      }
    }
  }

  toggleMonth(month: string) {
    if (this.selectedTimeframe === 'months') {
      if (this.selectedTime.includes(month)) {
        this.selectedTime = this.selectedTime.filter(s => s != month)
      } else {
        this.selectedTime = [...this.selectedTime, month]
      }
    }
  }

  toggleTimeframe() {
    if (this.selectedTimeframe === 'years') {
      this.selectedTimeframe = 'months'
      this.selectedTime = this.groupedMonths.flat()
    } else {
      this.selectedTimeframe = 'years'
      this.selectedTime = this.groupedMonths.map(group => group.at(0).split('.').at(-1))
    }
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {subscription.unsubscribe()})
  }
}
