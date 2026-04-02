import { ExpenseByCategorySearchParams } from '@/types/expense';
import dayjs from 'dayjs';

export const dayPeriod = 'day';
export const weekPeriod = 'week';
export const monthPeriod = 'month';
export const yearPeriod = 'year';
export const customPeriod = 'custom';
export const periods = [
  dayPeriod,
  weekPeriod,
  monthPeriod,
  yearPeriod,
  customPeriod,
] as const;
export const customPeriodIdx = periods.findIndex(x => x === customPeriod);

export function validSearchParams({
  period,
  diff,
  from,
  to,
}: ExpenseByCategorySearchParams) {
  return (
    validPeriodParam(period) &&
    vaalidDiffParam(diff) &&
    validCustomPeriodParams(period, from, to)
  );
}

function validPeriodParam(param: string | null) {
  return (periods as readonly string[]).includes(param ?? '');
}

function vaalidDiffParam(param: string | null) {
  if (param == null) return true;
  return Number.isInteger(+param) && param.trim() !== '';
}

function validCustomPeriodParams(
  period: string | null,
  from: string | null,
  to: string | null,
) {
  if (period !== customPeriod) return !from && !to;

  const fromDate = dayjs(from);
  const toDate = dayjs(to);

  return (
    from &&
    to &&
    fromDate.isValid() &&
    toDate.isValid() &&
    (toDate.isAfter(fromDate, 'day') || toDate.isSame(fromDate, 'day'))
  );
}
