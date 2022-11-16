import { Transaction } from './transaction'
import { Category, CategoryGroup } from './category'
import { Account } from './account'

export enum FluxActionTypes {
    Load,
    AddTransaction,
    UpdateTransaction,
    DeleteTransaction,
    AddAccount,
    UpdateAccount,
    DeleteAccount,
    AddCategoryGroup,
    UpdateCategoryGroup,
    DeleteCategoryGroup,
    AddCategory,
    UpdateCategory,
    DeleteCategory,
}

export class FluxAction {
    constructor(
        public type: FluxActionTypes,
        public transaction?: Transaction | null,
        public categoryGroup?: CategoryGroup | null,
        public category?: Category | null,
        public account?: Account
    ) {}
}
