import { Component, ElementRef, Inject, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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

  @ViewChild('modal', { static: false }) modal!: ElementRef
  @ViewChild('modalCategoryGroupForm', { static: false }) modalCategoryGroupForm!: ElementRef
  @ViewChild('modalCategoryForm', { static: false }) modalCategoryForm!: ElementRef

  @Input() category?: Category
  @Input() categoryGroup?: CategoryGroup
  @Input() selector?: string

  categoryGroupForm!: FormGroup
  id!: FormControl
  group!: FormControl
  name!: FormControl
  color!: FormControl

  categoryForm!: FormGroup
  group_id!: FormControl
  color_category!: FormControl

  categoryColors = CategoryGroupColors;
  equality_flag : boolean = false

  constructor(@Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>, public store: FluxStore) { }

  ngOnInit(){
    this.categoryGroupForm = new FormGroup({
      id: this.id = new FormControl(''),
      name: this.name = new FormControl(''),
      group: this.group = new FormControl(''),
      color: this.color = new FormControl(''),
     })
     this.categoryForm = new FormGroup({
      group_id: this.group_id = new FormControl(''),
      color_category: this.color_category = new FormControl(''),
     })
  }

  checkCategoryGroupForm(){
    if (this.categoryGroupForm.valid && this.categoryGroupForm.dirty) {
      let categoryGroup = this.categoryGroupForm.value
      if (this.selector === 'create') {
        categoryGroup.categories = []
        this.dispatcher.next(new FluxAction(FluxActionTypes.Create,'categoryGroup', null, categoryGroup))
      } else if (this.selector === 'edit') {
        this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'categoryGroup', null, categoryGroup))
      }
    }
  }

  submitCategoryGroupForm(e: Event) {
    e.preventDefault()
    
    this.checkCategoryGroupForm()
    this.hideModal();
  }

  submitCategoryForm(e: Event) {
    e.preventDefault();

    if (this.categoryForm.valid && this.categoryForm.dirty) {
      let category = this.categoryForm.value
      // let categoryGroup = Object.assign(this.categoryGroup!) // Ist glaube ich nicht noetig mal schauen was e2e bringt
      // categoryGroup.categories.push({name : this.categoryForm.value.group_id})
      this.dispatcher.next(new FluxAction(FluxActionTypes.Create, 'category', null, null, category))

      this.hideModal();
    }
  }

  deleteCategoryGroup() {
    this.dispatcher.next(new FluxAction(FluxActionTypes.Delete,'categoryGroup', null, this.categoryGroup))
    this.hideModal();
  }

  hideModal() {
    this.modal.nativeElement.classList.remove('is-active')
    this.categoryGroupForm.reset();
    this.categoryForm.reset();
    this.modalCategoryGroupForm.nativeElement.classList.add('is-hidden')
    this.modalCategoryForm.nativeElement.classList.add('is-hidden')
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['categoryGroup']?.currentValue?.name) {
      this.categoryGroupForm.patchValue(changes['categoryGroup'].currentValue);
    }
  }

}
