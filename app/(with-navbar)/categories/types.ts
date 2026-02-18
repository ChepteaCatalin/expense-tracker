export type CategoryType = 'expense' | 'income';

export interface CategoryFormValues {
  name: string;
  type: CategoryType;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}

export interface Category extends CategoryFormValues {
  id: number;
}

export interface CategoryIcon {
  src: string;
  Component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
