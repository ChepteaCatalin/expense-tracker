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
