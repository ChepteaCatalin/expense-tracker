"use client";

import { notFound, useSearchParams } from "next/navigation";
import { useEffect, useId } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { isValidCategoryType } from "../../utils";
import { type CategoryType } from "@/types/category";
import {
  Field,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function TypeRadioGroup({
  isEditMode,
  editingCategoryType,
}: {
  isEditMode: boolean;
  editingCategoryType?: CategoryType;
}) {
  const searchParams = useSearchParams();
  const urlCategoryType = searchParams.get("type");
  const { setValue } = useFormContext();

  const id = useId();

  useEffect(() => {
    if (!isEditMode) {
      setValue("type", urlCategoryType);
    }
  }, [isEditMode, setValue, urlCategoryType]);

  if (!isEditMode && !isValidCategoryType(urlCategoryType)) notFound();

  return (
    <Controller
      name="type"
      defaultValue={urlCategoryType}
      render={({ field }) => {
        const expenseDisabled =
          field.disabled || editingCategoryType === "income";
        const incomeDisabled =
          field.disabled || editingCategoryType === "expense";

        return (
          <FieldSet>
            <FieldLegend
              variant="label"
              className={`${field.disabled ? "opacity-50" : ""}`}
            >
              Type
            </FieldLegend>
            <RadioGroup
              name={field.name}
              value={field.value}
              onValueChange={field.onChange}
            >
              <Field orientation="horizontal" data-disabled={expenseDisabled}>
                <RadioGroupItem
                  value="expense"
                  id={`${id}-expense`}
                  disabled={expenseDisabled}
                />
                <FieldLabel htmlFor={`${id}-expense`}>Expense</FieldLabel>
              </Field>
              <Field orientation="horizontal" data-disabled={incomeDisabled}>
                <RadioGroupItem
                  value="income"
                  id={`${id}-income`}
                  disabled={incomeDisabled}
                />
                <FieldLabel htmlFor={`${id}-income`}>Income</FieldLabel>
              </Field>
            </RadioGroup>
          </FieldSet>
        );
      }}
    />
  );
}
