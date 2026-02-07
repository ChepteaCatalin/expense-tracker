'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import PasswordInput from '../_components/PasswordInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../_utils/signUpSchema';
import { signUp } from '../_actions/signUp';
import GoogleSignInButton from '../_components/GoogleSignInButton/GoogleSignInButton';
import { useActionState } from 'react';
import { SignUpFormErrors } from '../_types/signUp';
import ApiErrorAlert from '../_components/ApiErrorAlert';
import useResetFormAfterSubmit from '../_utils/useResetFormAfterSubmit';

export default function SignUpForm() {
  const {
    register,
    trigger,
    reset,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
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

  useResetFormAfterSubmit(reset, isPending);

  return (
    <form action={signUpAction} noValidate>
      <Grid container spacing={2}>
        <ApiErrorAlert message={actionErrors.api} />
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
          {...register('password')}
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
          type={isValid ? 'submit' : 'button'}
          onClick={() => trigger()}
          loading={isPending}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          Create account
        </Button>
        <GoogleSignInButton />
        <Grid container spacing={0.5}>
          <Typography>Already have an account?</Typography>
          <Link href="/signin" className={linkStyles.link}>
            Sign In
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
