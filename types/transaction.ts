import type { FormDateTime } from '@/lib/MuiDatePicker/types';
import type { FormErrors } from './form';
import type { Category } from './category';

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

export interface TransactionCategory {
  categoryId: number;
  name: string;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
  totalAmount: number;
}

interface TransactionCategoryChartItem {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export type TransactionCategoriesChartData =
  ReadonlyArray<TransactionCategoryChartItem>;

export type TransactionCategoryListItem = Readonly<
  Pick<Category, 'id' | 'name' | 'icon' | 'strokeColor' | 'backgroundColor'> & {
    amount: number;
    percentage: number;
  }
>;

export interface TransactionsByDate {
  date: Date;
  transactions: Transaction[];
  categoryName: string;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}
