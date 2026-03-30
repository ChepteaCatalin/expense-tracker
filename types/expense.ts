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
  period: string;
  diff: string | null;
  from: string | null;
  to: string | null;
}
