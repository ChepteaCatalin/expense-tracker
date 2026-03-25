import { FormDateTime } from '@/lib/MuiDatePicker/utils';
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
