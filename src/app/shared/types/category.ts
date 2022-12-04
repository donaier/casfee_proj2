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

export const CategoryGroupColors = [
  { name: 'light', value: '#EAF2E3'},
  { name: 'blue', value: '#61E8E1'},
  { name: 'red', value: '#F25757'},
  { name: 'yellow', value: '#F2E863'},
  { name: 'orange', value: '#F2CD60'},
]

export const CategoryGroupForm = {
  name: new FormControl('', [Validators.required]),
  color: new FormControl(''),
};

export const CategoryForm = {
  group: new FormControl('', [Validators.required]),
  name: new FormControl('', [Validators.required]),
  color: new FormControl(''),
};
