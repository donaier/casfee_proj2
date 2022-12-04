import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { TransactionForm } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-manual-transaction-form',
  templateUrl: './manual-transaction-form.component.html',
  styleUrls: ['./manual-transaction-form.component.scss']
})
export class ManualTransactionFormComponent implements OnInit, OnDestroy {

  @Input() account?: Account;
  public transactionForm: FormGroup = new FormGroup(TransactionForm);
  private categoryInput: HTMLInputElement | null = null

  private subscription : Subscription[] = []
  categoryGroups: CategoryGroup[] = [];

  constructor(public store: FluxStore) {}

  ngOnInit(){
    this.subscription.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
    }))

    this.categoryInput = document.querySelector('#category-manualTransaction')
  }

  hideModal() {
    document.getElementById('manual-transaction-form')?.classList.remove('is-active');
    this.transactionForm.reset();
  }

  addCategory(category: CategoryGroup) {
    // here is subcategory creation on the fly
  }

  setCategory(e: Event, category: Category) {
    if (this.categoryInput) {
      this.categoryInput.value = category.name

      document.querySelectorAll('.selectable-tag').forEach(tag => { tag.classList.remove('selected')});
      (<HTMLElement>e.target).classList.add('selected')
    }
  }

  submitTransactionForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    console.log(this.transactionForm)

    if (this.transactionForm.valid && this.transactionForm.dirty) {

      // store or create

      form.resetForm();
      this.transactionForm.reset();
      this.transactionForm.markAsUntouched();

      this.hideModal();
    }
  }

  ngOnDestroy() {
    this.subscription?.forEach((subscription) => {subscription.unsubscribe()})
  }
}
