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
