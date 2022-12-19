import { FormControl, Validators } from '@angular/forms';
import { Account } from './account';

export interface Transaction {
  description: string,
  fromAccount?: string,
  amount: number,
  date: Date,
  category: string,
  account?: Account
}

export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  fromAccount: new FormControl(''),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};
