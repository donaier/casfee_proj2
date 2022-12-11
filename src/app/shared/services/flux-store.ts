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
  Transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[] | any>({info: "init"})
  CategoryGroups: BehaviorSubject<CategoryGroup[]> = new BehaviorSubject<CategoryGroup[] | any>({info: "init"})
  CsvMasks: BehaviorSubject<csvMask[]> = new BehaviorSubject<csvMask[] | any>({info: "init"})

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
    this.dispatcher.subscribe(async (action: FluxAction) => {
      switch (action.type) {
        case FluxActionTypes.Load:
          this.listener_accounts()
          this.listener_categories()
          this.listener_transactions()
          this.listener_csvMasks()
          break
      }
    })
  }

  listener_accounts(){
    const q_accounts = query(collection(this.firestore, 'accounts'))
    const listener_accounts = onSnapshot(q_accounts, (querySnapshot) => {
      this.Accounts_all = []
      querySnapshot.forEach((doc) => {
        let data_copy : Account = Object.assign(doc.data())
        this.Accounts_all.push(data_copy)
      })
      this.Accounts.next(this.Accounts_all)
    })
  }

  listener_categories(){
    const q_categories = query(collection(this.firestore, 'categories'))
    const listener_categories = onSnapshot(q_categories, (querySnapshot) => {
      this.CategoryGroups_all = []
      querySnapshot.forEach((doc) => {
        let data_copy : CategoryGroup = Object.assign(doc.data())
        this.CategoryGroups_all.push(data_copy)
      })
      this.CategoryGroups.next(this.CategoryGroups_all)
    })
  }

  listener_transactions(){
    const q_transactions = query(collection(this.firestore, 'transactions'))
    const listener_transactions = onSnapshot(q_transactions, (querySnapshot) => {
      this.Transactions_all = []
      querySnapshot.forEach((doc) => {
        let data_copy : Transaction = Object.assign(doc.data())
        this.Transactions_all.push(data_copy)
      })
      this.CategoryGroups.next(this.CategoryGroups_all)
    })
  }

  listener_csvMasks(){
    const q_csvMasks = query(collection(this.firestore, 'csvMasks'))
    const listener_csvMasks = onSnapshot(q_csvMasks, (querySnapshot) => {
      this.CsvMasks_all = []
      querySnapshot.forEach((doc) => {
        let data_copy : csvMask = Object.assign(doc.data())
        this.CsvMasks_all.push(data_copy)
      })
      this.CsvMasks.next(this.CsvMasks_all)
    })
  }

}
