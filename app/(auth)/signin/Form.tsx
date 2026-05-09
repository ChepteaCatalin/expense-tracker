'use client';

import { useForm } from 'react-hook-form';
import { signInSchema } from '../validation';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { signIn } from '../actions';
import GoogleAuthButton from '../_components/GoogleAuthButton';
import PasswordInput from '@/components/PasswordInput';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { SignInFormValues } from '../types';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    subscribe,
    formState: { errors },
  } = useForm<SignInFormValues>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  });

  const [actionErrors, signInAction, isPending] = useActionState(signIn, {});

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
    <form
      noValidate
      onSubmit={handleSubmit(data => {
        startTransition(() => {
          setHideApiError(false);
          signInAction(data);
        });
      })}
    >
      <Grid container spacing={2}>
        <ApiFormErrorAlert
          hide={hideApiError}
          message={actionErrors.api}
          sx={{ mb: 1.5 }}
        />
        <TextField
          {...register('email')}
          label="Email"
          fullWidth
          required
          autoComplete="email"
          spellCheck="false"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <PasswordInput
          {...register('password')}
          label="Password"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Grid>
      <Grid container spacing={1.5} sx={{ mt: 4 }}>
        <Button
          type="submit"
          disabled={!hideApiError && !!actionErrors.api}
          loading={isPending}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          Sign In
        </Button>
        <GoogleAuthButton />
      </Grid>
    </form>
  );
}
