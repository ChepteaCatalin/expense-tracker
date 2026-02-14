import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Suspense } from 'react';
import AccountDetailsSkeleton from './_components/AccountDetailsSkeleton';
import ChangePasswordSkeleton from './_components/ChangePasswordSkeleton';
import Grid from '@mui/material/Grid';

export const metadata = {
  title: 'Settings',
  description: 'Manage your account and preferences',
};

export default function SettingsLayout({
  account,
  password,
}: {
  account: React.ReactNode;
  password: React.ReactNode;
}) {
  return (
    <Box
      component="main"
      boxSizing="content-box"
      maxWidth="600px"
      mx="auto"
      py={4}
      px={3}
    >
      <Box mb={6}>
        <Typography
          variant="h3"
          component="h1"
          color="primary"
          fontWeight={700}
        >
          Settings
        </Typography>
        <Typography color="text.secondary" fontWeight={600}>
          Manage your account and preferences
        </Typography>
      </Box>
      <Grid container spacing={6} flexDirection="column">
        <Suspense fallback={<AccountDetailsSkeleton />}>{account}</Suspense>
        <Suspense fallback={<ChangePasswordSkeleton />}>{password}</Suspense>
      </Grid>
    </Box>
  );
}
