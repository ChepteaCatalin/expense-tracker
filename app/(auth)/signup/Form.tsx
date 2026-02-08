'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import PasswordInput from '../_components/PasswordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../_utils/signUpSchema';
import { signUp } from '../_actions/signUp';
import GoogleAuthButton from '../_components/GoogleAuthButton';
import { startTransition, useActionState, useState } from 'react';
import { SignUpFormErrors, SignUpFormValues } from '../_types/signUp';
import ApiErrorAlert from '../_components/ApiErrorAlert';

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

  const [actionErrors, signUpAction, isPending] = useActionState(signUp, {
    api: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  } satisfies SignUpFormErrors);

  const [hideApiError, setHideApiError] = useState(false);
  subscribe({
    formState: { values: true },
    callback: () => setHideApiError(true),
  });

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
        <ApiErrorAlert hide={hideApiError} message={actionErrors.api} />
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
      <Grid
        container
        spacing={1.5}
        mt={4}
        flexDirection="column"
        alignItems="center"
        sx={{ width: '100%' }}
      >
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
