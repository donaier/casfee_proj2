import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { fluxDispatcherToken } from '../helpers/flux.configuration'


// types
import { Account, csvMask } from '../types/account'
import { CategoryGroup } from '../types/category'
import { Transaction } from '../types/transaction'
import { FluxAction, FluxActionTypes } from '../types/actions.type'

// Firestore
import { Firestore, onSnapshot, query } from '@angular/fire/firestore'
import { collection } from '@firebase/firestore'


@Injectable()

export class FluxStore {

  Transactions_all: Transaction[] = []
  Accounts_all: Account[] = []
  CategoryGroups_all: CategoryGroup[] = []
  CsvMasks_all: csvMask[] = []

  Accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[] | any>({})
  Transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[] | any>({})
  CategoryGroups: BehaviorSubject<CategoryGroup[]> = new BehaviorSubject<CategoryGroup[] | any>({})
  CsvMasks: BehaviorSubject<csvMask[]> = new BehaviorSubject<csvMask[] | any>({})

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
    this.dispatcher.subscribe(async (action: FluxAction) => {
      switch (action.type) {
        //
        // Mit dem Load Befehl wird die Datenbank geladen und an die Observables weitergegeben
        //  onSnapshot bedeutet realtime Update also wenn die DB aenderungen hat werden diese
        // regristriert und die Observables/Store wird geupdatet.
        //
        case FluxActionTypes.Load:
          const q_accounts = query(collection(this.firestore, 'accounts'))
          const listener_accounts = onSnapshot(q_accounts, (querySnapshot) => {
            this.Accounts_all = []
            querySnapshot.forEach((doc) => {
              this.Accounts_all.push({
                name: doc.data()['name'],
                shortName: doc.data()['shortName'],
                description: doc.data()['description'],
                initialValue: doc.data()['initialValue'],
                currentValue: doc.data()['currentValue'],
                color: doc.data()['color'],
                csv: doc.data()['csv'],
                transactions: doc.data()['transactions'],
              })
            })
            this.Accounts.next(this.Accounts_all)
          })
          const q_categories = query(collection(this.firestore, 'categories'))
          const listener_categories = onSnapshot(q_categories, (querySnapshot) => {
            this.CategoryGroups_all = []
            querySnapshot.forEach((doc) => {
              this.CategoryGroups_all.push({
                name: doc.data()['name'],
                color: doc.data()['color'],
                categories: doc.data()['categories']
              })
            })
            this.CategoryGroups.next(this.CategoryGroups_all)
          })
          // const q_transactions = query(collection(this.firestore, 'transactions'))
          // const listener_transactions = onSnapshot(q_transactions, (querySnapshot) => {
          //   this.Transactions_all = []
          //   querySnapshot.forEach((doc) => {
          //     this.Transactions_all.push({
          //       docName: doc.id,
          //       description: doc.data()['description'],
          //       fromAccount: doc.data()['fromAccount'],
          //       amount: doc.data()['amount'],
          //       date: doc.data()['date'],
          //       category: doc.data()['category']
          //     })
          //   })
          //   this.CategoryGroups.next(this.CategoryGroups_all)
          // })
          const q_csvMasks = query(collection(this.firestore, 'csvMasks'))
          const listener_csvMasks = onSnapshot(q_csvMasks, (querySnapshot) => {
            this.CsvMasks_all = []
            querySnapshot.forEach((doc) => {
              this.CsvMasks_all.push({
                name: doc.data()['name'],
                delimiter: doc.data()['delimiter'],
                mask: doc.data()['mask'],
              })
            })
            this.CsvMasks.next(this.CsvMasks_all)
          })
          break
      }
    })
  }
}
