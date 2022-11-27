import { FormControl, Validators } from "@angular/forms";

export interface CategoryGroup{
  name: string,
  color: string,
  categories: Category[]
}

export interface Category{
  group: string,
  name: string,
  color: string
}

export const CategoryGroupForm = {
  name: new FormControl('', [Validators.required]),
  color: new FormControl(''),
  categories: new FormControl(''),
};
