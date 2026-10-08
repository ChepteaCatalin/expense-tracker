import { format } from "date-fns";

export const TIME_ZONE_COOKIE = "tz";

export function isValidTimeZone(timeZone: string): boolean {
  try {
    new Intl.DateTimeFormat("en-US", { timeZone });
    return true;
  } catch {
    return false;
  }
}

export function todayInTimeZone(timeZone: string | undefined): string {
  if (!timeZone || !isValidTimeZone(timeZone)) {
    return format(new Date(), "yyyy-MM-dd");
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value;

  return `${part("year")}-${part("month")}-${part("day")}`;
}
