export interface DashboardSearchParams {
  from?: string | null;
  to?: string | null;
}

export interface SavingsByCurrency {
  currency: string;
  total: number;
}

export interface TotalsMetrics {
  income: number;
  expenses: number;
  savingsByCurrency: SavingsByCurrency[];
}

export interface MonthlyMetric {
  month: string;
  income: number;
  expenses: number;
  netIncome: number;
}

export interface SavingsChartData {
  months: string[];
  data: number[];
}

export interface CategoryBreakdown {
  categoryId: number;
  categoryName: string;
  backgroundColor: string;
  data: number[];
}

export interface BreakdownChartData {
  months: string[];
  categories: CategoryBreakdown[];
}
