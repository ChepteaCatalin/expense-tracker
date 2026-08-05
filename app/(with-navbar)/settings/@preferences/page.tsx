import { currencies } from '@/data/currency';
import Section from '../_components/Section';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import { requireAuth } from '@/lib/auth-utils';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';
import { type CategoryType } from '@/types/category';
import Link from 'next/link';

const DEFAULT_CATEGORY_TYPE: CategoryType = 'expense';

export default function PreferencesPage() {
  return (
    <Section title="Preferences">
      <Grid container spacing={3} sx={{ flexDirection: 'column' }}>
        <Suspense
          fallback={
            <Skeleton
              variant="rectangular"
              height={40}
              sx={{ borderRadius: '4px', mt: 1 }}
            />
          }
        >
          <UserCurrencyAutocomplete />
        </Suspense>
        <Link
          href={{
            pathname: '/categories/all',
            query: { type: DEFAULT_CATEGORY_TYPE },
          }}
        >
          <Button variant="outlined" fullWidth>
            Manage Expense and Income Categories
          </Button>
        </Link>
      </Grid>
    </Section>
  );
}

async function UserCurrencyAutocomplete() {
  const { user } = await requireAuth();

  return (
    <CurrencyAutocomplete
      key={user.id}
      defaultValue={currencies.find(c => c.code === user?.currency)}
      options={currencies.map(({ code, currency }) => ({ code, currency }))}
    />
  );
}
