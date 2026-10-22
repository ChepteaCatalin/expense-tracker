import { format, formatISO, parseISO } from "date-fns";

export function todayISO(): string {
  return formatISO(new Date());
}

export function calendarDateISO(date: Date | string): string {
  const d = new Date(date);
  return formatISO(
    new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()),
  );
}

/** The `yyyy-MM-dd` calendar day of a date read from the database. */
export function calendarDay(date: Date | string): string {
  return calendarDateISO(date).slice(0, 10);
}

/** Formats a `yyyy-MM-dd` calendar day for display, e.g. `5 Oct 2026`. */
export function formatCalendarDay(day: string): string {
  return format(parseISO(day), "d MMM yyyy");
}
