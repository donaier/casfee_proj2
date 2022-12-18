import { FormControl, Validators } from '@angular/forms';

export interface Transaction {
  description: string,
  fromAccount?: string,
  amount: number,
  date: string,
  category: string
}

export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  fromAccount: new FormControl(''),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};
