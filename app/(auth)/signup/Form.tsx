'use client';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import PasswordInput from '@/app/(auth)/_components/PasswordInput';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from './schema';
import { signUpAction } from './actions';

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver: zodResolver(signUpSchema),
  });

  return (
    <form action={signUpAction} noValidate onSubmit={handleSubmit(() => {})}>
      <Grid container spacing={2}>
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
        <PasswordInput label="Password" {...register('password')} />
        <PasswordInput
          label="Confirm Password"
          {...register('confirmPassword')}
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
          Create account
        </Button>
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
