import { Transaction } from './transaction'

export interface Account {
  name: string,
  shortname: string,
  description: string,
  initialValue: number,
  currentValue: number,
  color: string,
  csv: csvMask,
  transactions?: Transaction[]
}

export interface csvMask {
  name: string,
  delimiter: string,
  mask: string
}
