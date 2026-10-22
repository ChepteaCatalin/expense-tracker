export interface DashboardSearchParams {
  from?: string | null;
  to?: string | null;
}

export interface CurrencyTotal {
  currency: string;
  total: number;
}

export interface TotalsMetrics {
  income: number;
  expenses: number;
  savingsByCurrency: CurrencyTotal[];
  debtPaidByCurrency: CurrencyTotal[];
  remainingDebtByCurrency: CurrencyTotal[];
}

export interface MonthlyMetric {
  month: string;
  income: number;
  expenses: number;
  netIncome: number;
}

export interface CurrencySeries {
  currency: string;
  data: number[];
}

export interface CurrencySeriesChartData {
  months: string[];
  series: CurrencySeries[];
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

export interface CategoryTreemapNode {
  categoryId: number;
  categoryName: string;
  backgroundColor: string;
  value: number;
}
