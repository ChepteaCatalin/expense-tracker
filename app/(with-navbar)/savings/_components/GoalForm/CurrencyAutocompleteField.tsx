"use client";

import { type CurrencyOption } from "@/types/currency";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
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
  return (
    <Controller
      name="currency"
      {...(!isEditMode && { defaultValue })}
      render={({ field: { value, onChange, disabled } }) => (
        <Autocomplete
          renderInput={(params) => <TextField {...params} label="Currency" />}
          value={value}
          options={currencyOptions}
          getOptionLabel={(option) => `${option.currency} (${option.code})`}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          onChange={(_, value) => onChange(value)}
          disabled={disabled}
          disableClearable
        />
      )}
    />
  );
}
