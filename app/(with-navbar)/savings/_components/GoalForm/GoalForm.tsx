'use client';

import { type SavingsGoalFormValues } from '@/types/savings';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { FormProvider, useForm } from 'react-hook-form';
import { savingsGoalSchema } from '../../_utils/validation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import { normalizeAmountNumberInput } from '@/utils/input';
import Grid from '@mui/material/Grid';

export default function GoalForm({
  currencyAutocomplete,
  startDateField,
}: {
  currencyAutocomplete: React.ReactNode;
  startDateField: React.ReactNode;
}) {
  const isEditMode = false;
  const disabledForm = false;

  const methods = useForm<SavingsGoalFormValues>({
    shouldUnregister: true,
    defaultValues: getDefaultValues(),
    resolver: zodResolver(savingsGoalSchema),
    disabled: disabledForm,
  });
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <Stack
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(data => {
          // startTransition(() => {
          //   setHideApiError(false);
          //   if (isEditMode)
          //     updateTransactionAction({ ...data, id: transaction.id });
          //   else createTransactionAction(data);
          // });
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
              inputLabel: { shrink: true },
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
          maxRows={10}
          slotProps={{
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <Button
          type="submit"
          //TODO:
          // disabled={
          //   !hideApiError &&
          //   (!!createTransactionErrors.api || !!updateTransactionErrors.api)
          // }
          //TODO
          // loading={isPendingCreate || isPendingUpdate}
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
