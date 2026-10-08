import type { DashboardSearchParams } from "@/types/dashboard";
import { parseURLDate } from "@/utils/url";
import {
  format,
  isAfter,
  isSameDay,
  isValid,
  parseISO,
  startOfYear,
} from "date-fns";

export function validSearchParams({ from, to }: DashboardSearchParams) {
  if (!from && !to) return true;

  const fromDate = parseURLDate(from);
  const toDate = parseURLDate(to);

  return (
    isValid(fromDate) &&
    isValid(toDate) &&
    (isAfter(toDate, fromDate) || isSameDay(toDate, fromDate))
  );
}

export function normalizedSearchParams(
  { from, to }: DashboardSearchParams,
  today = format(new Date(), "yyyy-MM-dd"),
): DashboardSearchParams {
  if (!from && !to)
    return {
      from: format(startOfYear(parseISO(today)), "yyyy-MM-dd"),
      to: today,
    };

  return { from, to };
}
