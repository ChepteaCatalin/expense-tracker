import type { Category } from '@/types/category';
import { Transaction } from './transaction';

export interface ExpenseCategory {
  categoryId: number;
  name: string;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
  totalAmount: number;
}

interface ExpenseCategoryChartItem {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export type ExpenseCategoriesChartData =
  ReadonlyArray<ExpenseCategoryChartItem>;

export type ExpenseCategoryListItem = Readonly<
  Pick<Category, 'id' | 'name' | 'icon' | 'strokeColor' | 'backgroundColor'> & {
    amount: number;
    percentage: number;
  }
>;

export interface ExpensesByDate {
  date: Date;
  expenses: Transaction[];
  categoryName: string;
  icon: string;
  strokeColor: string;
  backgroundColor: string;
}
