"use client";

import DatePicker from "@/components/DatePicker";
import { Field, FieldLabel } from "@/components/ui/field";
import { Controller } from "react-hook-form";

export default function StartDateField({
  isEditMode,
}: {
  isEditMode?: boolean;
}) {
  return (
    <Controller
      name="startDate"
      {...(!isEditMode && { defaultValue: new Date().toISOString() })}
      render={({ field: { value, onChange, disabled } }) => (
        <Field>
          <FieldLabel>Start Date</FieldLabel>
          <DatePicker value={value} onChange={onChange} disabled={disabled} />
        </Field>
      )}
    />
  );
}
