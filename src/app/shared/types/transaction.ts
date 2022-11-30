import { FormControl, Validators } from '@angular/forms';
import { Category } from './category'

export interface Transaction {
  docName: string,
  description: string,
  forAccount: string,
  fromAccount?: string,
  amount: number,
  date: Date,
  category: Category
}

export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  forAccount: new FormControl('', [Validators.required]),
  fromAccount: new FormControl('', [Validators.required]),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};
