import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { fluxDispatcherToken } from 'src/app/shared/helpers/flux.configuration';
import { FluxStore } from 'src/app/shared/services/flux-store';
import { FluxAction, FluxActionTypes } from 'src/app/shared/types/actions.type';
import { Category, CategoryGroup } from 'src/app/shared/types/category';
import { CategoryFormComponent } from '../category-form/category-form.component';

@Component({
  selector: 'app-category-config',
  templateUrl: './category-config.component.html',
  styleUrls: ['./category-config.component.scss']
})
export class CategoryConfigComponent implements OnInit, OnDestroy {
  @ViewChild('categoryModal', { static: false }) categoryModal!: CategoryFormComponent

  selector: string | undefined
  categoryGroups: CategoryGroup[] = [];
  categoryForForm?: Category;
  categoryGroupForForm?: CategoryGroup;
  data: string = "isloading"
  private subscription : Subscription | undefined

  constructor(public store: FluxStore, @Inject(fluxDispatcherToken) private dispatcher: Subject<FluxAction>) { }

  ngOnInit(){
    this.subscription = this.store.CategoryGroups.subscribe((data) => {
      if (data.length > 0) {
        this.data = "data"
        this.categoryGroups = data;
      }
      if (data.length === undefined) {
        this.data = 'isloading'
      }
      if(data.length === 0){
        this.data = "nodata"
        this.categoryGroups = []
      }
    })
  }

  createCategoryGroup() {
    this.categoryGroupForForm = undefined
    this.selector = "create"
    this.categoryModal.modal.nativeElement.classList.add('is-active')
    this.categoryModal.modalCategoryGroupForm.nativeElement.classList.remove('is-hidden')
  }

  editCategoryGroup(categoryGroup: CategoryGroup) {
    this.categoryGroupForForm = categoryGroup
    this.selector = "edit"
    this.categoryModal.categoryGroupForm.patchValue(categoryGroup)
    this.categoryModal.modal.nativeElement.classList.add('is-active')
    this.categoryModal.modalCategoryGroupForm.nativeElement.classList.remove('is-hidden')
  }

  addCategory(categoryGroup: CategoryGroup) {
    this.categoryGroupForForm = categoryGroup;
    this.categoryForForm = undefined
    this.selector = "addCategory"
    this.categoryModal.modal.nativeElement.classList.add('is-active')
    this.categoryModal.modalCategoryForm.nativeElement.classList.remove('is-hidden')
    this.categoryModal.categoryIdInput.nativeElement.value = categoryGroup.id
  }

  // editCategory(category: Category) {
  //   this.categoryForForm = category;
  //   this.selector = "editcategory"
  //   this.categoryModal.modal.nativeElement.classList.add('is-active')
  //   this.categoryModal.modalCategoryForm.nativeElement.classList.remove('is-hidden')
  // }

  deleteCategory(category: Category, categoryGroup : CategoryGroup) {
    categoryGroup.categories = categoryGroup.categories?.filter(item => item.name !== category.name)
    this.dispatcher.next(new FluxAction(FluxActionTypes.Update,'category', null, categoryGroup))
  }

  ngOnDestroy(){
    this.subscription?.unsubscribe()
  }

}
