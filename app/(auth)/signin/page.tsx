import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link';
import linkStyles from '@/styles/Link.module.css';
import PasswordInput from '@/components/PasswordInput';
import GoogleSignInButton from '@/components/GoogleSignInButton/GoogleSignInButton';

const spacing = 2.5;

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to manage your finances with Expense Tracker',
};

export default function SignInPage() {
  return (
    <Grid
      component="main"
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: `calc(100vh - ${2 * spacing * 8}px)`, my: spacing }}
    >
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
          Sign In
        </Typography>
        <Grid container spacing={2}>
          <TextField
            label="Email"
            fullWidth
            required
            autoComplete="email"
            spellCheck="false"
          />
          <PasswordInput label="Password" />
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
      </Card>
    </Grid>
  );
}
