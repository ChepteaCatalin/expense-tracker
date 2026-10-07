import { format, isValid, parseISO } from "date-fns";

export function validIdParam(id: string): boolean {
  const s = id.trim();
  if (!/^[0-9]+$/.test(s)) return false;
  return Number.isSafeInteger(+s);
}

const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;

export function parseURLDate(date: string | null | undefined): Date {
  if (typeof date !== "string" || !isoDateRegex.test(date)) {
    return new Date(NaN);
  }

  const parsedDate = parseISO(date);
  if (
    !isValid(parsedDate) ||
    parsedDate.getFullYear() < 100 ||
    format(parsedDate, "yyyy-MM-dd") !== date
  ) {
    return new Date(NaN);
  }

  return parsedDate;
}
