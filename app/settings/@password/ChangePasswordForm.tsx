'use client';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { ChangePasswordFormValues } from '../types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { changePasswordSchema } from '../validation';
import PasswordInput from '@/app/(auth)/_components/PasswordInput';
import { startTransition, useActionState, useState } from 'react';
import { updatePassword } from '../actions';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';

export default function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    subscribe,
    trigger,
    formState: { errors, isSubmitted },
  } = useForm<ChangePasswordFormValues>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    resolver: zodResolver(changePasswordSchema),
  });

  const [actionErrors, changePasswordAction, isPending] = useActionState(
    updatePassword,
    {},
  );

  const [hideApiError, setHideApiError] = useState(false);
  subscribe({
    formState: { values: true },
    callback: () => setHideApiError(true),
  });

  return (
    <Stack
      component="form"
      noValidate
      onSubmit={handleSubmit(data => {
        startTransition(() => {
          setHideApiError(false);
          changePasswordAction(data);
        });
      })}
      spacing={3}
      p={1}
    >
      <ApiFormErrorAlert hide={hideApiError} message={actionErrors.api} />
      <PasswordInput
        {...register('currentPassword')}
        label="Current Password"
        error={!!errors.currentPassword}
        helperText={errors.currentPassword?.message}
      />
      <PasswordInput
        {...register('newPassword', {
          onChange: () => {
            if (isSubmitted) trigger('confirmNewPassword');
          },
        })}
        label="New Password"
        error={!!errors.newPassword}
        helperText={errors.newPassword?.message}
      />
      <PasswordInput
        {...register('confirmNewPassword')}
        label="Confirm New Password"
        error={!!errors.confirmNewPassword}
        helperText={errors.confirmNewPassword?.message}
      />
      <Divider />
      <Button
        type="submit"
        disabled={!hideApiError && !!actionErrors.api}
        loading={isPending}
        loadingPosition="start"
        variant="contained"
        fullWidth
      >
        Change Password
      </Button>
    </Stack>
  );
}
