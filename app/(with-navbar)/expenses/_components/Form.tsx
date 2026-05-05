'use client';

import { Expense, ExpenseFormValues } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { expenseSchema } from '../validation';
import { startTransition, useActionState, useEffect, useState } from 'react';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { Category } from '@/types/category';
import CategoriesInput from './CategoriesInput';
import Link from 'next/link';
import { DatePicker } from '@mui/x-date-pickers';
import {
  toDatePickerValue,
  handleDatePickerChange,
} from '@/lib/MuiDatePicker/utils';
import InputAdornment from '@mui/material/InputAdornment';
import { createExpense, updateExpense } from '../actions';
import dayjs from 'dayjs';
import { fromCents } from '@/utils/currency';
import DeleteExpense from './DeleteExpense';
import { useSearchParams } from 'next/navigation';

export default function Form({
  currency,
  categories,
  expense,
}: {
  currency?: string;
  categories: Category[];
  expense?: Expense;
}) {
  const searchParams = useSearchParams();

  const isEditMode = !!expense;

  const [createExpenseErrors, createExpenseAction, isPendingCreate] =
    useActionState(createExpense.bind(null, searchParams.toString()), {});
  const [updateExpenseErrors, updateExpenseAction, isPendingUpdate] =
    useActionState(updateExpense.bind(null, searchParams.toString()), {});

  const disabledForm = isPendingCreate || isPendingUpdate;

  const methods = useForm<ExpenseFormValues>({
    defaultValues: getDefaultValues(expense),
    resolver: zodResolver(expenseSchema),
    disabled: disabledForm,
  });
  const {
    register,
    control,
    subscribe,
    handleSubmit,
    reset,
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
    function resetFormOnMount() {
      reset(getDefaultValues(expense));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createExpenseErrors.api || updateExpenseErrors.api}
        sx={{ mb: 3 }}
      />
      <Stack
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(data => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) updateExpenseAction({ ...data, id: expense.id });
            else createExpenseAction(data);
          });
        })}
      >
        <TextField
          {...register('amount', { setValueAs: normalizeNumberInput })}
          label="Amount"
          required
          autoComplete="off"
          spellCheck="false"
          error={!!errors.amount}
          helperText={errors.amount?.message}
          slotProps={{
            htmlInput: {
              inputMode: 'decimal',
              onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                e.currentTarget.select(),
            },
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
            input: {
              endAdornment: (
                <InputAdornment position="end">{currency}</InputAdornment>
              ),
            },
          }}
          sx={{ maxWidth: 150, alignSelf: 'center' }}
        />
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
        <TextField
          {...register('description')}
          label="Description"
          autoComplete="off"
          spellCheck="false"
          error={!!errors.description}
          helperText={errors.description?.message}
          multiline
          maxRows={10}
          slotProps={{
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
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
          disabled={
            !hideApiError &&
            (!!createExpenseErrors.api || !!updateExpenseErrors.api)
          }
          loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
        {isEditMode && <DeleteExpense id={expense.id} />}
      </Stack>
    </FormProvider>
  );
}

function getDefaultValues(expense?: Expense): ExpenseFormValues {
  if (expense) {
    return {
      amount: fromCents(expense.amount),
      categoryId: expense.categoryId,
      date: dayjs(expense.date).toISOString(),
      description: expense.description,
    };
  }

  return {
    amount: '',
    categoryId: '',
    date: dayjs().toISOString(),
    description: '',
  };
}

function normalizeNumberInput(value: string): number | '' {
  const normalized = String(value).trim().replace(',', '.');

  if (!normalized) return '';

  return +normalized;
}
