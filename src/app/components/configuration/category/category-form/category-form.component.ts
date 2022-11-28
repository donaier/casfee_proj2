import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Category, CategoryGroupForm, CategoryGroup, CategoryForm } from 'src/app/shared/types/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnChanges {

  @Input() category?: Category;
  @Input() categoryGroup?: CategoryGroup;

  public categoryGroupForm: FormGroup = new FormGroup(CategoryGroupForm);
  public categoryForm: FormGroup = new FormGroup(CategoryForm);

  constructor() { }

  hideModal() {
    document.getElementById('category-form')?.classList.remove('is-active');
    this.categoryGroupForm.reset();
    this.categoryForm.reset();

    document.getElementById('category-group-form')?.classList.add('is-hidden');
    document.getElementById('subcategory-form')?.classList.add('is-hidden');

  }

  deleteCategoryGroup(categoryGroup?: CategoryGroup) {
    if (categoryGroup) {
      console.log('categoryGroup delete');
    }
  }

  deleteCategory(category?: Category) {
    if (category) {
      console.log('subcategory delete');
    }
  }

  submitCategoryGroupForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    console.log(this.categoryGroupForm);

    if (this.categoryGroupForm.valid && this.categoryGroupForm.dirty) {

      // store or create

      form.resetForm();
      this.categoryGroupForm.reset();
      this.categoryGroupForm.markAsUntouched();

      this.hideModal();
    }
  }

  submitCategoryForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();

    console.log(this.categoryForm);

    if (this.categoryForm.valid && this.categoryForm.dirty) {

      // store or create

      form.resetForm();
      this.categoryForm.reset();
      this.categoryForm.markAsUntouched();

      this.hideModal();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryGroup']?.currentValue?.name) {
      this.categoryGroupForm.patchValue(changes['categoryGroup'].currentValue);
    }
  }
}
