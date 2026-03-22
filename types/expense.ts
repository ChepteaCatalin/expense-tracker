import { FormDateTime } from '@/lib/MuiDatePicker/utils';

export interface ExpenseFormValues {
  amount: number | '';
  categoryId: number | '';
  date: FormDateTime;
}
