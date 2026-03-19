'use client';

import { ExpenseFormValues } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { expenseSchema } from '../validation';
import { startTransition, useEffect, useState } from 'react';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';

export default function Form() {
  //TODO:
  const disabledForm = false;
  const isEditMode = false;

  const methods = useForm<ExpenseFormValues>({
    shouldUnregister: true,
    defaultValues: getDefaultValues(),
    resolver: zodResolver(expenseSchema),
    disabled: disabledForm,
  });
  const {
    register,
    reset,
    subscribe,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [hideApiError, setHideApiError] = useState(false);
  subscribe({
    formState: { values: true },
    callback: () => setHideApiError(true),
  });

  useEffect(
    function resetFormOnUnmount() {
      return reset;
    },
    [reset],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={undefined} //FIXME:
        sx={{ mb: 3 }}
      />
      <Grid
        container
        direction="column"
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(() => {
          startTransition(() => {
            setHideApiError(false);

            //TODO:
            // if (isEditMode) updateCategoryAction({ ...category, ...data });
            // else createCategoryAction(data);
          });
        })}
      >
        <TextField
          {...register('amount', { setValueAs: normalizeNumberInput })}
          type="text"
          label="Amount"
          fullWidth
          required
          autoComplete="off"
          spellCheck="false"
          error={!!errors.amount}
          helperText={errors.amount?.message}
          disabled={disabledForm}
          slotProps={{
            htmlInput: { inputMode: 'decimal' },
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <Divider />
        <Button
          type="submit"
          //   TODO:
          //   disabled={
          //     !hideApiError &&
          //     (!!createCategoryErrors.api || !!updateCategoryErrors.api)
          //   }
          //   TODO:
          //   loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      </Grid>
    </FormProvider>
  );
}

function getDefaultValues(): ExpenseFormValues {
  return {
    amount: '',
  };
}

function normalizeNumberInput(value: string): number | '' {
  const normalized = String(value).trim().replace(',', '.');

  if (!normalized) return '';

  return +normalized;
}
