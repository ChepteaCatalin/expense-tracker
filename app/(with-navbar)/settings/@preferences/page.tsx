import { currencies } from '@/data/currency';
import Section from '../_components/Section';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import { requireAuth } from '@/lib/auth-utils';
import Grid from '@mui/material/Grid';
import ManageCategoriesBtn from './ManageCategoriesBtn';

export default async function PreferencesPage() {
  const { user } = await requireAuth();

  return (
    <Section title="Preferences">
      <Grid container spacing={3} direction="column">
        <CurrencyAutocomplete
          key={user.id}
          defaultValue={currencies.find(c => c.code === user?.currency)}
          options={currencies.map(({ code, currency }) => ({ code, currency }))}
        />
        <ManageCategoriesBtn />
      </Grid>
    </Section>
  );
}
