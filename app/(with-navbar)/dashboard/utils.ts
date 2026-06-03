import type { DashboardSearchParams } from '@/types/dashboard';
import { parseURLDate } from '@/utils/url';

export function validSearchParams({ from, to }: DashboardSearchParams) {
  if (!from && !to) return true;

  const fromDate = parseURLDate(from);
  const toDate = parseURLDate(to);

  return (
    fromDate.isValid() &&
    toDate.isValid() &&
    (toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day'))
  );
}
