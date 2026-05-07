'use client';

import { Transaction } from '@/types/transaction';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { transactionSchema } from '@/utils/validation';
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
import dayjs from 'dayjs';
import { fromCents } from '@/utils/currency';
import DeleteTransaction from './DeleteTransaction';
import { useSearchParams } from 'next/navigation';
import {
  CreateTransactionAction,
  DeleteTransactionAction,
  TransactionFormErrors,
  TransactionFormValues,
  TransactionFormValuesWithId,
  TransactionType,
  UpdateTransactionAction,
} from '@/types/transaction';
import { capitalizeFirstLetter } from '@/utils/string';

interface FormProps {
  type: TransactionType;
  currency?: string;
  categories: Category[];
  transaction?: Transaction;
  createAction?: CreateTransactionAction;
  updateAction?: UpdateTransactionAction;
  deleteAction?: DeleteTransactionAction;
}

export default function Form({
  type,
  currency,
  categories,
  transaction,
  createAction,
  updateAction,
  deleteAction,
}: FormProps) {
  const searchParams = useSearchParams();

  const isEditMode = !!transaction;

  const [createTransactionErrors, createTransactionAction, isPendingCreate] =
    useActionState(
      createAction?.bind(null, searchParams.toString()) ??
        noopTransactionAction,
      {},
    );
  const [updateTransactionErrors, updateTransactionAction, isPendingUpdate] =
    useActionState(
      updateAction?.bind(null, searchParams.toString()) ??
        noopTransactionAction,
      {},
    );

  const disabledForm = isPendingCreate || isPendingUpdate;

  const methods = useForm<TransactionFormValues>({
    defaultValues: getDefaultValues(transaction),
    resolver: zodResolver(transactionSchema),
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
      reset(getDefaultValues(transaction));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createTransactionErrors.api || updateTransactionErrors.api}
        sx={{ mb: 3 }}
      />
      <Stack
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(data => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode)
              updateTransactionAction({ ...data, id: transaction.id });
            else createTransactionAction(data);
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
            query: { type },
          }}
        >
          <Button variant="outlined" fullWidth>
            Manage {capitalizeFirstLetter(type)} Categories
          </Button>
        </Link>
        <Button
          type="submit"
          disabled={
            !hideApiError &&
            (!!createTransactionErrors.api || !!updateTransactionErrors.api)
          }
          loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
        {isEditMode && (
          <DeleteTransaction
            id={transaction.id}
            type={type}
            action={deleteAction!}
          />
        )}
      </Stack>
    </FormProvider>
  );
}

function getDefaultValues(transaction?: Transaction): TransactionFormValues {
  if (transaction) {
    return {
      amount: fromCents(transaction.amount),
      categoryId: transaction.categoryId,
      date: dayjs(transaction.date).toISOString(),
      description: transaction.description,
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

async function noopTransactionAction(
  state: TransactionFormErrors,
  payload: TransactionFormValues | TransactionFormValuesWithId,
): Promise<TransactionFormErrors> {
  void state;
  void payload;
  return {};
}
