import {
  endOfWeek as dateFnsEndOfWeek,
  startOfWeek as dateFnsStartOfWeek,
} from "date-fns";

export const startOfWeek = (date: Date) =>
  dateFnsStartOfWeek(date, { weekStartsOn: 1 });

export const endOfWeek = (date: Date) =>
  dateFnsEndOfWeek(date, { weekStartsOn: 1 });
