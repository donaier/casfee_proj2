import { Component, Input, OnInit } from '@angular/core';
import { Category, CategoryGroup } from 'src/app/shared/types/category';

@Component({
  selector: 'app-category-config',
  templateUrl: './category-config.component.html',
  styleUrls: ['./category-config.component.scss']
})
export class CategoryConfigComponent {

  @Input() categoryGroups: CategoryGroup[] = [];

  public categoryForForm?: Category;
  public categoryGroupForForm?: CategoryGroup;

  constructor() { }

  createCategoryGroup() {
    this.categoryGroupForForm = undefined;
    document.getElementById('category-form')?.classList.add('is-active');
  }

  editCategoryGroup(categoryGroup: CategoryGroup) {
    this.categoryGroupForForm = categoryGroup;
    document.getElementById('category-form')?.classList.add('is-active');
  }

  addCategory(categoryGroup: CategoryGroup) {
    console.log('new child on ' + categoryGroup.name)
  }

  deleteCategory(category: Category) {
    console.log('delete Category (child)')
  }
}
