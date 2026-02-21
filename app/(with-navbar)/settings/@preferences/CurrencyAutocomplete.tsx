'use client';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { startTransition, useActionState, useState } from 'react';
import { updateCurrency } from '../actions';
import Box from '@mui/material/Box';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';

type CurrencyOption = {
  code: string;
  currency: string;
};

export default function CurrencyAutocomplete({
  defaultValue,
  options,
}: {
  defaultValue?: CurrencyOption;
  options: CurrencyOption[];
}) {
  const [value, setValue] = useState(defaultValue);

  const [actionErrors, updateCurrencyAction, isPending] = useActionState(
    updateCurrency,
    {},
  );

  if (actionErrors.api && value?.code !== defaultValue?.code) {
    setValue(defaultValue);
  }

  return (
    <Box>
      <ApiFormErrorAlert message={actionErrors.api} sx={{ mb: 1.5 }} />
      <Autocomplete
        renderInput={params => <TextField {...params} label="Currency" />}
        value={value}
        options={options}
        getOptionLabel={option => `${option.currency} (${option.code})`}
        isOptionEqualToValue={(option, value) => option.code === value.code}
        onChange={(_, value) => {
          setValue(value);
          startTransition(() => {
            updateCurrencyAction(value.code);
          });
        }}
        disabled={isPending}
        disableClearable
        sx={{ mt: actionErrors.api ? 2 : 1 }}
      />
    </Box>
  );
}
