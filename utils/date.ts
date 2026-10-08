import { formatISO } from "date-fns";

export function todayISO(): string {
  return formatISO(new Date());
}

export function calendarDateISO(date: Date | string): string {
  const d = new Date(date);
  return formatISO(
    new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}
