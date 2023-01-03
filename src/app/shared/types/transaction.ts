import { FormControl, Validators } from '@angular/forms';

export const DATE_FORMAT = 'DD.MM.YYYY'

/*
export interface Transaction {
  description: string,
  fromAccount?: string,
  amount: number,
  date: string,
  categoryId: string,
  id?: string
} */

export interface Transaction {
  description: string,
  fromAccount?: string,
  amount: number,
  date: string,
  categoryId: string,
  categoryName?: string,
  accountName?: String,
  accountShortName?: String,
  id: string
}
/*
export const TransactionForm = {
  description: new FormControl('', [Validators.required]),
  fromAccount: new FormControl(''),
  amount: new FormControl('', [Validators.required]),
  date: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
};
*/
