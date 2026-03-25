import { FormDateTime } from '@/lib/MuiDatePicker/utils';
import { FormErrors } from './form';

export class Expense {
  id: number;
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Record<string, any>) {
    this.id = data.id;
    this.amount = data.amount;
    this.categoryId = data.category_id;
    this.date = new Date(data.date);
    this.description = data.description;
    this.createdAt = new Date(data.created_at);
    this.updatedAt = new Date(data.updated_at);
  }
}

export interface ExpenseFormValues {
  amount: number | '';
  categoryId: number | '';
  date: FormDateTime;
  description: string;
}

export type ExpenseFormErrors = FormErrors<ExpenseFormValues>;
