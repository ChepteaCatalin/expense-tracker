import { FormDateTime } from '@/lib/MuiDatePicker/utils';
import { FormErrors } from './form';

export interface ExpenseFormValues {
  amount: number | '';
  categoryId: number | '';
  date: FormDateTime;
  description: string;
}

export type ExpenseFormErrors = FormErrors<ExpenseFormValues>;
