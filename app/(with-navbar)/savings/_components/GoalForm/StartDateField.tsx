"use client";

import DatePicker from "@/components/DatePicker";
import { Field, FieldLabel } from "@/components/ui/field";
import { cn } from "cn";
import { Controller } from "react-hook-form";
import { todayISO } from "@/utils/date";

export default function StartDateField({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  return (
    <Controller
      name="startDate"
      {...(!isEditMode && { defaultValue: todayISO() })}
      render={({ field: { value, onChange, disabled } }) => (
        <Field>
          <FieldLabel className={cn({ "opacity-50": disabled })}>
            Start Date
          </FieldLabel>
          <DatePicker value={value} onChange={onChange} disabled={disabled} />
        </Field>
      )}
    />
  );
}
