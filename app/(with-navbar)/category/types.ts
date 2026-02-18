import { FormErrors } from '@/types/form';

export type CategoryType = 'expense' | 'income';

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}

export type CategoryFormErrors = FormErrors<CategoryFormValues>;

export interface Category extends CategoryFormValues {
  id: number;
}

export interface CategoryIcon {
  src: string;
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
