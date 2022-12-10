import { Component, ElementRef, Inject, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Account } from 'src/app/shared/types/account';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { TransactionForm } from 'src/app/shared/types/transaction';

@Component({
  selector: 'app-manual-transaction-form',
  templateUrl: './manual-transaction-form.component.html',
  styleUrls: ['./manual-transaction-form.component.scss']
})
export class ManualTransactionFormComponent implements OnInit, OnDestroy {
  @ViewChild('modal') modal!: ElementRef

  @Input() account?: Account;
  transactionForm: FormGroup = new FormGroup(TransactionForm);

  private subscription : Subscription[] = []
  categoryGroups: CategoryGroup[] = [];

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) {}

  ngOnInit(){
    this.subscription.push(this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
    }))
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active')
    document.querySelectorAll('.selectable-tag').forEach(tag => { tag.classList.remove('selected')});
    this.transactionForm.reset();
  }

  addCategory(category: CategoryGroup) {
    // here is subcategory creation on the fly
  }

  setCategory(e: Event, category: Category) {
    this.transactionForm.controls['category'].setValue(category.name);

    document.querySelectorAll('.selectable-tag').forEach(tag => { tag.classList.remove('selected')});
    (<HTMLElement>e.target).classList.add('selected')
  }

  submitTransactionForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    if(this.transactionForm.valid && this.transactionForm.dirty) {
      let account = Object.assign(this.account!)
      account.transactions.push(this.transactionForm.value)
      this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'account', null, null, null, account))

      this.hideModal()

      form.resetForm();
      this.transactionForm.reset();
      this.transactionForm.markAsUntouched();
    }
  }

  ngOnDestroy() {
    this.subscription?.forEach((subscription) => {subscription.unsubscribe()})
  }
}
