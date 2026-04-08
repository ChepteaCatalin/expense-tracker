import { currencies } from '@/data/currency';
import Section from '../_components/Section';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import { requireAuth } from '@/lib/auth-utils';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { CategoryType } from '@/types/category';
import Link from 'next/link';

const DEFAULT_CATEGORY_TYPE: CategoryType = 'expense';

export default async function PreferencesPage() {
  const { user } = await requireAuth();

  return (
    <Section title="Preferences">
      <Grid container spacing={3} sx={{ flexDirection: 'column' }}>
        <CurrencyAutocomplete
          key={user.id}
          defaultValue={currencies.find(c => c.code === user?.currency)}
          options={currencies.map(({ code, currency }) => ({ code, currency }))}
        />
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
