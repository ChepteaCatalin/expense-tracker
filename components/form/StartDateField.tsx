"use client";

import DatePicker from "@/components/DatePicker";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { cn } from "cn";
import { Controller } from "react-hook-form";
import { todayISO } from "@/utils/date";

export default function StartDateField({
  isEditMode,
  maxDate,
}: {
  isEditMode?: boolean;
  maxDate?: string;
}) {
  return (
    <Controller
      name="startDate"
      {...(!isEditMode && { defaultValue: todayISO() })}
      render={({ field: { value, onChange, disabled }, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel className={cn({ "opacity-50": disabled })}>
            Start Date
          </FieldLabel>
          <DatePicker
            value={value}
            onChange={onChange}
            disabled={disabled}
            maxDate={maxDate}
            invalid={fieldState.invalid}
          />
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
