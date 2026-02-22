import { FormErrors } from './form';

export type CategoryType = 'expense' | 'income';

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}

export type CategoryFormErrors = FormErrors<CategoryFormValues>;

export interface CategoryIcon {
  src: string;
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
