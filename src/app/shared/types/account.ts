import { FormControl, Validators } from '@angular/forms';
import { Transaction } from './transaction'

export interface Account {
  name: string,
  shortName: string,
  description: string,
  initialValue: number,
  currentValue: number,
  color: string,
  csv: string,
  transactions: Transaction[]
}

export const AccountForm = {
  name: new FormControl('', [Validators.required]),
  shortName: new FormControl(''),
  description: new FormControl(''),
  initialValue: new FormControl(''),
  color: new FormControl(''),
  csv: new FormControl('', [Validators.required]),
};

export const AccountColors = [
  { name: 'blue', value: 'hsl(217, 71%, 53%)'},
  { name: 'light blue', value: 'hsl(204, 86%, 53%)'},
  { name: 'green', value: 'hsl(141, 71%, 48%)'},
  { name: 'yellow', value: 'hsl(48, 100%, 67%)'},
  { name: 'red', value: 'hsl(348, 100%, 61%)'},
]

export interface csvMask {
  name: string,
  delimiter: string,
  mask: string
}

export const CsvMaskForm = {
  name: new FormControl('', [Validators.required]),
  delimiter: new FormControl('', [Validators.required]),
  mask: new FormControl('', [Validators.required]),
};
