import type { Category } from '@/types/category';

interface ExpenseByCategoryChartItem {
  readonly name: string;
  readonly value: number;
  readonly color: string;
}

export type ExpenseByCategoryChartData =
  ReadonlyArray<ExpenseByCategoryChartItem>;

export type CategoryItem = Readonly<
  Pick<Category, 'id' | 'name' | 'icon' | 'strokeColor' | 'backgroundColor'> & {
    amount: number;
    percentage: number;
  }
>;
