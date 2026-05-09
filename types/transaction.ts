import { FormDateTime } from '@/lib/MuiDatePicker/types';
import { FormErrors } from './form';

export interface Transaction {
  id: number;
  amount: number;
  categoryId: number;
  date: Date;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionFormValues {
  amount: number | '';
  categoryId: number | '';
  date: FormDateTime;
  description: string;
}

export interface TransactionFormValuesWithId extends TransactionFormValues {
  id: number;
}

export type TransactionFormErrors = FormErrors<TransactionFormValues>;

export type CreateTransactionAction = (
  searchParams: string,
  _: TransactionFormErrors,
  values: TransactionFormValues,
) => Promise<TransactionFormErrors>;

export type UpdateTransactionAction = (
  searchParams: string,
  _: TransactionFormErrors,
  values: TransactionFormValuesWithId,
) => Promise<TransactionFormErrors>;

export type DeleteTransactionAction = (
  searchParams: string,
  _: string,
  { id }: { id: number },
) => Promise<string>;

export type TransactionType = 'expense' | 'income';

export interface TransactionCategoriesSearchParams {
  day?: string | null;
  week?: string | null;
  month?: string | null;
  year?: string | null;
  custom?: string | null;
  from?: string | null;
  to?: string | null;
}

export interface TransactionByCategorySearchParams extends TransactionCategoriesSearchParams {
  sortBy?: SortTransactionBy | null;
}

export type SortTransactionBy = 'date' | 'amount';
