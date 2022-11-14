import { Transaction } from './transaction'
import { Category, CategoryGroup } from './category'
import { Account } from './account'

export enum FluxActionTypes {
    Load,
    AddTransaction,
    DeleteTransaction,
    AddAccount,
    DeleteAccount,
    AddCategoryGroup,
    UpdateCategoryGroup,
    DeleteCategoryGroup,
    AddCategory,
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
