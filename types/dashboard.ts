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

export interface ExpenseCategoryBreakdownCategory {
  categoryId: number;
  categoryName: string;
  backgroundColor: string;
  data: number[];
}

export interface ExpenseCategoryBreakdown {
  months: string[];
  categories: ExpenseCategoryBreakdownCategory[];
}
