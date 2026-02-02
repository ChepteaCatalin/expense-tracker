import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import PasswordInput from '@/app/(auth)/_components/PasswordInput';
import Logo from '../_components/Logo';

const spacing = 2.5;

export const metadata = {
  title: 'Sign Up',
  description: 'Create an account to manage your finances with Expense Tracker',
};

export default function SignUpPage() {
  return (
    <Grid
      component="main"
      container
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: `calc(100vh - ${2 * spacing * 8}px)`, my: spacing }}
    >
      <Logo />
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: spacing,
          mx: spacing,
          gap: spacing,
          borderRadius: '10px',
          maxWidth: '400px',
        }}
      >
        <Typography component="h1" sx={{ fontWeight: 700, fontSize: '1.5rem' }}>
          Sign Up
        </Typography>
        <Grid container spacing={2}>
          <TextField
            label="Name"
            fullWidth
            required
            autoComplete="name"
            spellCheck="false"
          />
          <TextField
            label="Email"
            fullWidth
            required
            autoComplete="email"
            spellCheck="false"
          />
          <PasswordInput label="Password" />
          <PasswordInput label="Confirm Password" />
        </Grid>
        <Grid
          container
          spacing={1.5}
          mt={1.5}
          flexDirection="column"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Button variant="contained" fullWidth>
            Create account
          </Button>
          <Grid container spacing={0.5}>
            <Typography>Already have an account?</Typography>
            <Link href="/signin" className={linkStyles.link}>
              Sign In
            </Link>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
}
