export type CategoryType = 'expense' | 'income';

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  image: string;
  backgroundColor: string;
}

export interface Category extends CategoryFormValues {
  id: number;
}

export interface CategoryIcon {
  src: string;
  alt: string;
}
