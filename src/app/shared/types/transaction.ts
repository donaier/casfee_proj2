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
