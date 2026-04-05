import { FormDateTime } from '@/lib/MuiDatePicker/types';
import { FormErrors } from './form';
import type { Category } from '@/types/category';

export interface Expense {
  id: number;
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ExpenseFormValues {
  amount: number | '';
  categoryId: number | '';
  date: FormDateTime;
  description: string;
}

export type ExpenseFormErrors = FormErrors<ExpenseFormValues>;

export interface ExpensesByCategorySearchParams {
  day?: string | null;
  week?: string | null;
  month?: string | null;
  year?: string | null;
  custom?: string | null;
  from?: string | null;
  to?: string | null;
}

export interface ExpensesByCategory {
  categoryId: number;
  name: string;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
  totalAmount: number;
}

interface ExpensesByCategoryChartItem {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export type ExpensesByCategoryChartData =
  ReadonlyArray<ExpensesByCategoryChartItem>;

export type CategoryItem = Readonly<
  Pick<Category, 'id' | 'name' | 'icon' | 'strokeColor' | 'backgroundColor'> & {
    amount: number;
    percentage: number;
  }
>;
