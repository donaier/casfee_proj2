import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { Subject } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroupForm, CategoryGroup, CategoryForm, CategoryGroupColors } from 'src/app/shared/types/category';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnChanges, OnInit {

  @Input() category?: Category
  @Input() categoryGroup?: CategoryGroup
  @Input() selector?: string

//  categoryGroupForm: FormGroup = new FormGroup(CategoryGroupForm);
  categoryGroupForm!: FormGroup
  group!: FormControl
  name!: FormControl
  color!: FormControl

  categoryForm!: FormGroup
  name_category!: FormControl
  color_category!: FormControl

  /*
  categoryForm!: FormGroup
  name!: FormControl
  color!: FormControl

  group: new FormControl('', [Validators.required]),
  name: new FormControl('', [Validators.required]),
  color: new FormControl(''),

  name: new FormControl('', [Validators.required]),
  color: new FormControl(''), */

  categoryColors = CategoryGroupColors;

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) { }

  ngOnInit(){
    this.categoryGroupForm = new FormGroup({
      name: this.name = new FormControl(''),
      group: this.group = new FormControl(''),
      color: this.color = new FormControl(''),
     })
     this.categoryForm = new FormGroup({
      name_category: this.name_category = new FormControl(''),
      color_category: this.color_category = new FormControl(''),
     })
  }

  checkForm(){
    if (this.categoryGroupForm.valid && this.categoryGroupForm.dirty) {
      let categoryGroup = this.categoryGroupForm.value
      categoryGroup.categories = []
      this.dispatcher.next(new FluxAction(FluxActionTypes.Create,'categoryGroup', null, categoryGroup))
    }
  }

  submitCategoryGroupForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();
    if(this.store.CategoryGroups_all.length === 0){
      this.checkForm()
    }
    this.store.CategoryGroups_all.forEach(group => {
      if(group.name !== this.categoryGroupForm.value.name){
        this.checkForm()
      }
    })
    this.hideModal();
  }

  editCategoryGroup(){
    if (this.categoryGroupForm.valid && this.categoryGroupForm.dirty) {
      let categoryGroup_new = this.categoryGroupForm.value
      categoryGroup_new.categories = this.categoryGroup!.categories
      this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'categoryGroup', null, this.categoryGroup))
      this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'categoryGroup', null, this.categoryGroupForm.value))
      this.hideModal();
    }
  }

  submitCategoryForm(e: Event, form: FormGroupDirective) {
    e.preventDefault();
    if (this.categoryForm.valid && this.categoryForm.dirty) {
      let categoryGroup = Object.assign(this.categoryGroup!) // Ist glaube ich nicht noetig mal schauen was e2e bringt
      categoryGroup.categories.push({name : this.categoryForm.value.name_category})
      this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'category', null, categoryGroup))
      this.hideModal();
    }
  }

  deleteCategoryGroup() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'categoryGroup', null, this.categoryGroup))
    this.hideModal();
  }

  hideModal() {
    document.getElementById('category-form')?.classList.remove('is-active');
    this.categoryGroupForm.reset();
    this.categoryForm.reset();
    document.getElementById('category-group-form')?.classList.add('is-hidden');
    document.getElementById('subcategory-form')?.classList.add('is-hidden');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryGroup']?.currentValue?.name) {
      this.categoryGroupForm.patchValue(changes['categoryGroup'].currentValue);
    }
  }

}
