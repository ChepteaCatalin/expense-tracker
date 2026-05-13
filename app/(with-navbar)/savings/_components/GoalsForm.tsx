'use client';

import { type SavingsGoalFormValues } from '@/types/savings';
import { zodResolver } from '@hookform/resolvers/zod';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { savingsGoalSchema } from '../_utils/validation';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';

export default function GoalsForm() {
  // TODO:
  const isEditMode = false;
  const disabledForm = false;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SavingsGoalFormValues>({
    shouldUnregister: true,
    defaultValues: getDefaultValues(),
    resolver: zodResolver(savingsGoalSchema),
    disabled: disabledForm,
  });

  return (
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
        multiline
        maxRows={3}
        error={!!errors.name}
        helperText={errors.name?.message}
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
  );
}

function getDefaultValues(): SavingsGoalFormValues {
  // TODO: handle edit mode
  return {
    name: '',
  };
}
