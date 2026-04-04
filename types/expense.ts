import { FormDateTime } from '@/lib/MuiDatePicker/types';
import { FormErrors } from './form';

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

export interface ExpenseByCategorySearchParams {
  day?: string | null;
  week?: string | null;
  month?: string | null;
  year?: string | null;
  custom?: string | null;
  from?: string | null;
  to?: string | null;
}
