import Box from '@mui/material/Box';
import { Suspense } from 'react';
import AccountDetailsSkeleton from './_components/AccountDetailsSkeleton';
import ChangePasswordSkeleton from './_components/ChangePasswordSkeleton';
import Grid from '@mui/material/Grid';
import PreferencesSkeleton from './_components/PreferencesSkeleton';
import Heading from '@/components/Heading';

export const metadata = {
  title: 'Settings',
  description: 'Manage your account and preferences',
};

export default function SettingsLayout({
  account,
  password,
  preferences,
}: {
  account: React.ReactNode;
  password: React.ReactNode;
  preferences: React.ReactNode;
}) {
  return (
    <Box boxSizing="content-box" maxWidth="600px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Grid container spacing={6} flexDirection="column">
        <Suspense fallback={<AccountDetailsSkeleton />}>{account}</Suspense>
        <Suspense fallback={<ChangePasswordSkeleton />}>{password}</Suspense>
        <Suspense fallback={<PreferencesSkeleton />}>{preferences}</Suspense>
      </Grid>
    </Box>
  );
}
