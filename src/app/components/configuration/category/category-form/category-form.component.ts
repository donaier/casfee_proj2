import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Category, CategoryGroupForm, CategoryGroup } from 'src/app/shared/types/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnChanges {

  @Input() category?: Category;
  @Input() categoryGroup?: CategoryGroup;

  public categoryGroupForm: FormGroup = new FormGroup(CategoryGroupForm);

  constructor() { }

  hideModal() {
    document.getElementById('category-form')?.classList.remove('is-active');
    this.categoryGroupForm.reset();
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    if (changes['categoryGroup']?.currentValue?.name) {
      this.categoryGroupForm.patchValue(changes['categoryGroup'].currentValue);
    }
  }
}
