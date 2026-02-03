import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Logo from '../_components/Logo';
import Form from './Form';

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
        <Form />
      </Card>
    </Grid>
  );
}
