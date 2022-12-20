import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Account } from 'src/app/shared/types/account';
import { ListTransaction } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnChanges {
  @Input() accounts: Account[] = []

  allTransactions: ListTransaction[] = []

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['accounts']) {
      this.allTransactions = []

      this.accounts.forEach(account => {
        let tempTransactions: ListTransaction[] = [...account.transactions];
        tempTransactions.map(t => {
          t.accountName = account.name
          t.accountShortName = account.shortName
        })

        this.allTransactions.push(...tempTransactions)
      })
      // this.allTransactions.sort((a,b) => Date.parse(a.date) - Date.parse(b.date))
    }
  }
}
