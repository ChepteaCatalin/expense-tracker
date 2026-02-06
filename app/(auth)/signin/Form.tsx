'use client';

import { useForm } from 'react-hook-form';
import { signInSchema } from '../_utils/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { signIn } from '../_actions/signIn';
import GoogleSignInButton from '../_components/GoogleSignInButton/GoogleSignInButton';
import PasswordInput from '../_components/PasswordInput';
import { useActionState } from 'react';
import { SignInFormErrors } from '../_types/signIn';
import Alert from '@mui/material/Alert';

export default function SignInForm() {
  const {
    register,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  });

  const [actionErrors, signInAction, isPending] = useActionState(signIn, {
    api: '',
    email: '',
    password: '',
  } satisfies SignInFormErrors);

  return (
    <form action={signInAction} noValidate>
      <Grid container spacing={2}>
        <Grid container spacing={1} flexDirection="column" flex="1">
          {[actionErrors.api, actionErrors.email, actionErrors.password]
            .filter(Boolean)
            .map(err => (
              <Alert severity="error" key={err}>
                {err}
              </Alert>
            ))}
        </Grid>
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
      <Grid
        container
        spacing={1.5}
        mt={1.5}
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
          Sign In
        </Button>
        <GoogleSignInButton />
        <Grid container spacing={0.5}>
          <Typography>{`Don't have an account?`}</Typography>
          <Link href="/signup" className={linkStyles.link}>
            Sign Up
          </Link>
        </Grid>
      </Grid>
    </form>
  );
}
