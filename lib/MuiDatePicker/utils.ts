import type { PickerValue } from "@mui/x-date-pickers/internals";
import dayjs from "dayjs";
import z from "zod";
import { type FormDateTime } from "./types";

export function handleDatePickerChange(onChange: (...event: any[]) => void) {
  return (date: PickerValue) =>
    onChange(date?.isValid() ? date.toISOString() : null);
}

export function toDatePickerValue(value: FormDateTime) {
  return value ? dayjs(value) : null;
}

const invalidDateError = "Please enter a valid date";
export const validDate = z
  .any()
  .refine((v) => v, { message: invalidDateError })
  .pipe(
    z
      .string({ message: invalidDateError })
      .refine((v) => !isNaN(Date.parse(v)), {
        message: invalidDateError,
      }),
  );
