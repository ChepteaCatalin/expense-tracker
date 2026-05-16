'use client';

import { type SavingsGoalFormValues } from '@/types/savings';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { savingsGoalSchema } from '../../validation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { normalizeAmountNumberInput } from '@/utils/input';
import Grid from '@mui/material/Grid';
import { startTransition, useActionState, useEffect, useState } from 'react';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import { createSavingsGoal } from '../../actions';

interface FormProps {
  currencyAutocomplete: React.ReactNode;
  startDateField: React.ReactNode;
}

export default function GoalForm({
  currencyAutocomplete,
  startDateField,
}: FormProps) {
  const isEditMode = false; // TODO:

  const [createGoalErrors, createGoalAction, isPendingCreate] = useActionState(
    createSavingsGoal,
    {},
  );

  const disabledForm = isPendingCreate; //TODO: || isPendingUpdate;

  const methods = useForm<SavingsGoalFormValues>({
    defaultValues: getDefaultValues(), //TODO: handle edit mode
    resolver: zodResolver(savingsGoalSchema),
    disabled: disabledForm,
  });
  const {
    register,
    handleSubmit,
    trigger,
    subscribe,
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

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createGoalErrors.api} //TODO: handle edit
        sx={{ mb: 3 }}
      />
      <Stack
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(data => {
          startTransition(() => {
            setHideApiError(false);

            //TODO:
            // if (isEditMode)
            //   updateTransactionAction({ ...data, id: transaction.id });
            // else
            createGoalAction(data);
          });
        })}
      >
        <TextField
          {...register('name')}
          label="Name"
          fullWidth
          required
          autoComplete="off"
          spellCheck="false"
          error={!!errors.name}
          helperText={errors.name?.message}
          slotProps={{
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        {currencyAutocomplete}
        <Grid container spacing={2}>
          <TextField
            {...register('initialAmount', {
              setValueAs: normalizeAmountNumberInput,
              onChange: () => trigger('targetAmount'),
            })}
            label="Initial Amount"
            required
            autoComplete="off"
            spellCheck="false"
            error={!!errors.initialAmount}
            helperText={errors.initialAmount?.message}
            slotProps={{
              htmlInput: {
                inputMode: 'decimal',
                onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                  e.currentTarget.select(),
              },
              inputLabel: { shrink: true },
            }}
            sx={{ flex: 1 }}
          />
          <TextField
            {...register('targetAmount', {
              setValueAs: normalizeAmountNumberInput,
              onChange: () => trigger('targetAmount'),
            })}
            label="Target Amount"
            required
            autoComplete="off"
            spellCheck="false"
            error={!!errors.targetAmount}
            helperText={errors.targetAmount?.message}
            slotProps={{
              htmlInput: {
                inputMode: 'decimal',
                onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                  e.currentTarget.select(),
              },
              inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
            }}
            sx={{ flex: 1 }}
          />
        </Grid>
        {startDateField}
        <TextField
          {...register('notes')}
          label="Notes"
          autoComplete="off"
          spellCheck="false"
          error={!!errors.notes}
          helperText={errors.notes?.message}
          multiline
          minRows={2}
          maxRows={10}
          slotProps={{
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <Button
          type="submit"
          disabled={!hideApiError && !!createGoalErrors.api} //TODO: handle edit
          loading={isPendingCreate} //TODO: handle edit
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

function getDefaultValues(): SavingsGoalFormValues {
  // TODO: handle edit mode
  return {
    name: '',
    initialAmount: 0,
    targetAmount: '',
    notes: '',
  } as SavingsGoalFormValues;
}
