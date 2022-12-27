import { Component, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Transaction } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction } from 'src/app/shared/types/actions.type';
import { Category } from 'src/app/shared/types/category';
import { ListTransaction } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, OnChanges, OnDestroy {
  @Input() accounts: Account[] = []

  private subscriptions: Subscription[] = [];

  allTransactions: ListTransaction[] = []
  allCategories: Category[] = []

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) {}

  ngOnInit() {
    this.subscriptions.push(this.store.Categories.subscribe((data) => {
      if (data.length) {
        this.allCategories = data
      }
    }))
  }

  categoryNameFor(transaction: ListTransaction) {
    return this.allCategories.find(cat => cat.id === transaction.categoryId)?.name
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accounts']) {
      this.allTransactions = []

      this.accounts.forEach(account => {
        let tempTransactions: ListTransaction[] = [...account.transactions];
        tempTransactions.map(t => {
          t.accountName = account.name
          t.accountShortName = account.shortName
          t.date = t.date
        })

        this.allTransactions.push(...tempTransactions)
      })
      this.allTransactions.sort((a,b) => Date.parse(moment(b.date, 'DD.MM.YYYY').toString()) - Date.parse(moment(a.date, 'DD.MM.YYYY').toString()))
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => {subscription.unsubscribe()})
  }
}
