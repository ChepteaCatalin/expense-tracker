import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AccountDetails from './_components/AccountDetails';
import Section from './_components/Section';
import { Suspense } from 'react';
import AccountDetailsSkeleton from './_components/AccountDetailsSkeleton';

export const metadata = {
  title: 'Settings',
  description: 'Manage your account and preferences',
};

export default async function SettingsPage() {
  return (
    <Box
      component="main"
      boxSizing="content-box"
      maxWidth="600px"
      mx="auto"
      py={4}
      px={3}
    >
      <Box mb={4.5}>
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
      <Section title="Account">
        <Suspense fallback={<AccountDetailsSkeleton />}>
          <AccountDetails />
        </Suspense>
      </Section>
    </Box>
  );
}
