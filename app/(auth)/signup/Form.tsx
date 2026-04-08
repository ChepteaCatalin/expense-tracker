'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PasswordInput from '../_components/PasswordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../validation';
import { signUp } from '../actions';
import GoogleAuthButton from '../_components/GoogleAuthButton';
import { startTransition, useActionState, useEffect, useState } from 'react';
import { SignUpFormValues } from '../types';
import ApiFormErrorAlert from '../../../components/ApiFormErrorAlert';

export default function SignUpForm() {
  const {
    register,
    trigger,
    handleSubmit,
    subscribe,
    formState: { errors, isSubmitted },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  const [actionErrors, signUpAction, isPending] = useActionState(signUp, {});

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
          signUpAction(data);
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
          {...register('name')}
          label="Name"
          fullWidth
          required
          autoComplete="name"
          spellCheck="false"
          error={!!errors.name}
          helperText={errors.name?.message}
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
          label="Password"
          {...register('password', {
            onChange: () => {
              if (isSubmitted) trigger('confirmPassword');
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <PasswordInput
          label="Confirm Password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
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
          Create account
        </Button>
        <GoogleAuthButton />
      </Grid>
    </form>
  );
}
