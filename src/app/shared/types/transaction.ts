import { FormControl, Validators } from '@angular/forms';
import { Category } from './category'

export interface Transaction {
  docName: string,
  description: string,
  fromAccount?: string,
  amount: number,
  date: Date,
  category: Category
}

export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  fromAccount: new FormControl(''),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};
