'use client';

import { ExpenseFormValues } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
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

export default function Form({ categories }: { categories: Category[] }) {
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
            htmlInput: {
              inputMode: 'decimal',
              onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                e.currentTarget.select(),
            },
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <CategoriesInput categories={categories} disabled={disabledForm} />
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
  };
}

function normalizeNumberInput(value: string): number | '' {
  const normalized = String(value).trim().replace(',', '.');

  if (!normalized) return '';

  return +normalized;
}
