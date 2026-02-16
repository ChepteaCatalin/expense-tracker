export type CategoryType = 'expense' | 'income';

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  image: string;
}

export interface Category extends CategoryFormValues {
  id: number;
}
