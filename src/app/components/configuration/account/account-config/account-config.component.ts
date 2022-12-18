import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account, csvMask } from 'src/app/shared/types/account';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  selector: 'app-account-config',
  templateUrl: './account-config.component.html',
  styleUrls: ['./account-config.component.scss']
})
export class AccountConfigComponent implements OnInit, OnDestroy {
  @ViewChild('accountModal') accountModal!: AccountFormComponent

  accounts: Account[] = []
  subscriptions : Subscription | undefined
  accountForForm?: Account
  selector : string | undefined
  data : string = 'isloading'

  constructor(public store: FluxStore) {}

  ngOnInit() {
    this.subscriptions = this.store.Accounts.subscribe((data) => {
      if (data.length) {
        this.accounts = data;
        this.data = 'data'
      }
      if (data.length === undefined) {
        this.data = 'isloading'
      }
      if(data.length === 0){
        this.data = 'nodata'
        this.accounts = []
      }
    })
  }

  createAccount() {
    this.accountForForm = undefined
    this.selector = "create"
    this.accountModal.modal.nativeElement.classList.add('is-active')
  }

  editAccount(account: Account) {
    this.accountForForm = account
    this.selector = "edit"
    this.accountModal.modal.nativeElement.classList.add('is-active')
  }

  deleteAccount(account: Account) {
    this.selector = "delete"
    this.accountForForm = account
    this.accountModal.modal.nativeElement.classList.add('is-active')
  }

  ngOnDestroy(){
    this.subscriptions?.unsubscribe()
  }
}
