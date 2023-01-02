import { Inject, Injectable } from '@angular/core'
import { BehaviorSubject, Subject } from 'rxjs'
import { fluxDispatcherToken } from '../helpers/flux.configuration'

// types
import { Account, csvMask } from '../types/account'
import { Category, CategoryGroup } from '../types/category'
import { Transaction } from '../types/transaction'
import { FluxAction, FluxActionTypes } from '../types/actions.type'

// Firestore
import { Firestore, onSnapshot, query } from '@angular/fire/firestore'
import { collection, QuerySnapshot } from '@firebase/firestore'


@Injectable()

export class FluxStore {

  Accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[] | any>({})
  Transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[] | any>({info: "init"})
  CategoryGroups: BehaviorSubject<CategoryGroup[]> = new BehaviorSubject<CategoryGroup[] | any>({info: "init"})
  Categories: BehaviorSubject<Category[]> = new BehaviorSubject<Category[] | any>({info: "init"})
  CsvMasks: BehaviorSubject<csvMask[]> = new BehaviorSubject<csvMask[] | any>({info: "init"})

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, private firestore: Firestore) {
    this.dispatcher.subscribe(async (action: FluxAction) => {
      switch (action.type) {
        case FluxActionTypes.Load:
          this.listener_accounts()
          this.listener_categories()
          // this.listener_transactions()
          this.listener_csvMasks()
          break
      }
    })
  }

  listener_accounts(){
    const q_accounts = query(collection(this.firestore, 'accounts'))
    const listener_accounts = onSnapshot(q_accounts, (querySnapshot) => {
      let Accounts_all : Account[]  = []
      querySnapshot.forEach((doc) => {
        let data_copy : Account = Object.assign(doc.data())
        data_copy.id = doc.id
        Accounts_all.push(data_copy)
      })
      this.Accounts.next(Accounts_all)
    })
  }

  listener_categories(){
    const q_categoryGroups = query(collection(this.firestore, 'categoryGroups'))
    const listener_categoryGroups = onSnapshot(q_categoryGroups, (querySnapshot) => {
      let CategoryGroups_all : CategoryGroup[]  = []
      querySnapshot.forEach((doc) => {
        let data_copy : CategoryGroup = Object.assign(doc.data())
        data_copy.id = doc.id
        CategoryGroups_all.push(data_copy)
      })
      this.CategoryGroups.next(CategoryGroups_all)
    })
    const q_categories = query(collection(this.firestore, 'categoryEntries'))
    const listener_categories = onSnapshot(q_categories, (querySnapshot) => {
      let Categories_all : Category[] = []
      querySnapshot.forEach((doc) => {
        let data_copy: Category = Object.assign(doc.data())
        data_copy.id = doc.id
        Categories_all.push(data_copy)
      })
      this.Categories.next(Categories_all)
    })
  }

  // listener_transactions(){
  //   const q_transactions = query(collection(this.firestore, 'transactions'))
  //   const listener_transactions = onSnapshot(q_transactions, (querySnapshot) => {
  //     this.Transactions_all = []
  //     querySnapshot.forEach((doc) => {
  //       let data_copy : Transaction = Object.assign(doc.data())
  //       this.Transactions_all.push(data_copy)
  //     })
  //     this.CategoryGroups.next(this.CategoryGroups_all)
  //   })
  // }

  listener_csvMasks(){
    const q_csvMasks = query(collection(this.firestore, 'csvMasks'))
    const listener_csvMasks = onSnapshot(q_csvMasks, (querySnapshot) => {
      let CsvMasks_all : csvMask[] = []
      querySnapshot.forEach((doc) => {
        let data_copy : csvMask = Object.assign(doc.data())
        data_copy.id = doc.id
        CsvMasks_all.push(data_copy)
      })
      this.CsvMasks.next(CsvMasks_all)
    })
  }

}
