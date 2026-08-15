"use client";

import {
  startTransition,
  useActionState,
  useId,
  useRef,
  useState,
} from "react";
import { updateCurrency } from "../actions";
import { type ChangeCurrencyError } from "../types";
import { type CurrencyOption } from "@/types/currency";
import { cn } from "@/lib/utils";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

export default function CurrencyAutocomplete({
  defaultValue,
  options,
}: {
  defaultValue?: CurrencyOption;
  options: CurrencyOption[];
}) {
  const [value, setValue] = useState(defaultValue);
  const lastValidValue = useRef(defaultValue);
  const id = useId();
  const errorId = `${id}-error`;

  const [actionErrors, updateCurrencyAction, isPending] = useActionState(
    async (
      _: ChangeCurrencyError,
      currency: CurrencyOption,
    ): Promise<ChangeCurrencyError> => {
      const errors = await updateCurrency({}, currency.code);

      if (errors.api) {
        setValue(lastValidValue.current);
      } else {
        lastValidValue.current = currency;
        setValue(currency);
      }

      return errors;
    },
    {},
  );

  function handleValueChange(currency: CurrencyOption | null) {
    if (!currency) return;
    if (currency.code === value?.code) return;

    setValue(currency);

    startTransition(() => {
      updateCurrencyAction(currency);
    });
  }

  const showError = !!actionErrors.api && !isPending;

  return (
    <div className="mb-1 flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn("text-sm font-medium", {
          "text-destructive": showError,
        })}
      >
        Currency
      </label>
      <Combobox
        value={value}
        items={options}
        onValueChange={handleValueChange}
        itemToStringLabel={optionLabel}
        itemToStringValue={(item) => item.code}
        isItemEqualToValue={(item, selectedValue) =>
          item.code === selectedValue.code
        }
        disabled={isPending}
      >
        <ComboboxInput
          id={id}
          placeholder="Select a currency"
          aria-invalid={showError}
          aria-describedby={showError ? errorId : undefined}
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
      {showError && (
        <p id={errorId} role="alert" className="text-destructive text-sm">
          {actionErrors.api}
        </p>
      )}
    </div>
  );
}

function optionLabel(item: CurrencyOption) {
  return `${item.currency} (${item.code})`;
}
