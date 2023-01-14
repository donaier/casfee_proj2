import { Injectable } from '@angular/core';
import { Account } from '../types/account';
import { Category, CategoryGroup } from '../types/category';

@Injectable({providedIn: 'root'})

export class UtilityService {
  constructor() {}

  checkavailableCategories(categoryGroups : CategoryGroup[], categories : Category[]) : CategoryGroup[]{
    if(categoryGroups && categories){
      categoryGroups.forEach(categoryGroup => {
        categoryGroup.categories = false
        categories.forEach(category =>{
          if(categoryGroup.id === category.group_id){
            categoryGroup.categories = true
          }
        })
      })
    }
    return categoryGroups
  }

  calculateCurrentValue(account: Account) {
    let currentValue = account.initialValue
    account.transactions.forEach(t => {
      currentValue += t.amount
    });
    return Number(currentValue).toFixed(2)
  }
}
