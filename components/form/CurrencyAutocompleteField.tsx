"use client";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { type CurrencyOption } from "@/types/currency";
import { useId } from "react";
import { Controller } from "react-hook-form";

export default function CurrencyAutocompleteField({
  currencyOptions,
  defaultValue,
  isEditMode,
}: {
  currencyOptions: CurrencyOption[];
  defaultValue?: CurrencyOption;
  isEditMode?: boolean;
}) {
  const id = useId();

  return (
    <Controller
      name="currency"
      {...(!isEditMode && { defaultValue })}
      render={({ field: { value, onChange, disabled, ref }, fieldState }) => (
        <Field data-invalid={fieldState.invalid} data-disabled={disabled}>
          <FieldLabel htmlFor={id}>
            Currency <span className="text-destructive">*</span>
          </FieldLabel>
          <Combobox
            value={value ?? null}
            items={currencyOptions}
            onValueChange={onChange}
            itemToStringLabel={optionLabel}
            itemToStringValue={(item) => item.code}
            isItemEqualToValue={(item, selectedValue) =>
              item.code === selectedValue?.code
            }
            disabled={disabled}
          >
            <ComboboxInput
              id={id}
              ref={ref}
              placeholder="Select a currency"
              showClear={!!value}
              disabled={disabled}
              aria-invalid={fieldState.invalid}
              required
            />
            <ComboboxContent>
              <ComboboxEmpty>No currencies found</ComboboxEmpty>
              <ComboboxList>
                {(item) => (
                  <ComboboxItem key={item.code} value={item}>
                    {optionLabel(item)}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}

function optionLabel(item: CurrencyOption) {
  return `${item.currency} (${item.code})`;
}
