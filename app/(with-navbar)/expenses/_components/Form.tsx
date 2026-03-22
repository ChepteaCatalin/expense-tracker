'use client';

import { ExpenseFormValues } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { expenseSchema } from '../validation';
import { startTransition, useEffect, useState } from 'react';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { Category } from '@/types/category';
import CategoriesInput from './CategoriesInput';
import Link from 'next/link';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { DatePicker } from '@mui/x-date-pickers';
import {
  toDatePickerValue,
  handleDatePickerChange,
} from '@/lib/MuiDatePicker/utils';

export default function Form({
  currency,
  categories,
}: {
  currency: string;
  categories: Category[];
}) {
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
    control,
    reset,
    subscribe,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [hideApiError, setHideApiError] = useState(false);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: () => setHideApiError(true),
      }),
    [subscribe],
  );

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
      <Stack
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
        <Grid container justifyContent="center" alignItems="center" gap={1}>
          <TextField
            {...register('amount', { setValueAs: normalizeNumberInput })}
            type="text"
            label="Amount"
            required
            autoComplete="off"
            spellCheck="false"
            error={!!errors.amount}
            helperText={errors.amount?.message}
            disabled={disabledForm}
            slotProps={{
              htmlInput: {
                inputMode: 'decimal',
                onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                  e.currentTarget.select(),
              },
              inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
            }}
            sx={{ maxWidth: 150 }}
          />
          <Typography component="span">{currency}</Typography>
        </Grid>
        <CategoriesInput categories={categories} disabled={disabledForm} />
        <Controller
          name="date"
          control={control}
          render={({ field: { name, value, onChange, disabled } }) => (
            <DatePicker
              label="Date"
              name={name}
              disabled={disabled}
              value={toDatePickerValue(value)}
              onChange={handleDatePickerChange(onChange)}
              slotProps={{
                textField: {
                  required: true,
                  error: !!errors.date,
                  helperText: errors.date?.message,
                },
              }}
            />
          )}
        />
        <Divider />
        <Link
          href={{
            pathname: '/categories/all',
            query: { type: 'expense' },
          }}
        >
          <Button variant="outlined" fullWidth>
            Manage Expense Categories
          </Button>
        </Link>
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
      </Stack>
    </FormProvider>
  );
}

function getDefaultValues(): ExpenseFormValues {
  return {
    amount: '',
    categoryId: '',
    date: null,
  };
}

function normalizeNumberInput(value: string): number | '' {
  const normalized = String(value).trim().replace(',', '.');

  if (!normalized) return '';

  return +normalized;
}
