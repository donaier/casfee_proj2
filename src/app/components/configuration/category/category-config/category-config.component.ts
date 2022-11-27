import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { Category, CategoryGroup } from 'src/app/shared/types/category';

@Component({
  selector: 'app-category-config',
  templateUrl: './category-config.component.html',
  styleUrls: ['./category-config.component.scss']
})
export class CategoryConfigComponent implements OnInit, OnDestroy {

  categoryGroups: CategoryGroup[] = [];
  categoryForForm?: Category;
  categoryGroupForForm?: CategoryGroup;
  private subscription : Subscription | undefined

  constructor(public store: FluxStore) { }

  ngOnInit(){
    this.subscription = this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.categoryGroups = data;
      }
    })
  }

  createCategoryGroup() {
    this.categoryGroupForForm = undefined;
    document.getElementById('category-form')?.classList.add('is-active');
    document.getElementById('category-group-form')?.classList.remove('is-hidden');
  }

  editCategoryGroup(categoryGroup: CategoryGroup) {
    this.categoryGroupForForm = categoryGroup;
    document.getElementById('category-form')?.classList.add('is-active');
    document.getElementById('category-group-form')?.classList.remove('is-hidden');
  }

  addCategory(categoryGroup: CategoryGroup) {
    this.categoryGroupForForm = categoryGroup;
    this.categoryForForm = undefined;
    document.getElementById('category-form')?.classList.add('is-active');
    document.getElementById('subcategory-form')?.classList.remove('is-hidden');
  }

  editCategory(category: Category) {
    this.categoryForForm = category;
    document.getElementById('category-form')?.classList.add('is-active');
    document.getElementById('subcategory-form')?.classList.remove('is-hidden');
  }

  deleteCategory(category: Category) {
    console.log('delete Category (child)')
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }

}
