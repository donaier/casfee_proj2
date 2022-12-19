import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Account } from 'src/app/shared/types/account';
import { Transaction } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnChanges {
  @Input() accounts: Account[] = []

  allTransactions: Transaction[] = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accounts']) {
      this.accounts.forEach(account => {
        let tempTransactions: Transaction[] = account.transactions;
        tempTransactions.map(t => t.account = account)

        this.allTransactions.push(...tempTransactions)
      })
      // this.allTransactions.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }
  }
}
