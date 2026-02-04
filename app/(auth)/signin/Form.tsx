'use client';

import { useForm } from 'react-hook-form';
import { signInSchema } from '../_lib/signInSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { signInAction } from './actions';
import GoogleSignInButton from '../_components/GoogleSignInButton/GoogleSignInButton';
import PasswordInput from '../_components/PasswordInput';

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(signInSchema),
  });

  return (
    <form action={signInAction} noValidate onSubmit={handleSubmit(() => {})}>
      <Grid container spacing={2}>
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
        <Button type="submit" variant="contained" fullWidth>
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
