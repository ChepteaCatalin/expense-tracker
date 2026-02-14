import { currencies } from '@/data/currency';
import Section from '../_components/Section';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import { requireAuth } from '@/lib/auth-utils';

export default async function PreferencesPage() {
  const { user } = await requireAuth();

  return (
    <Section title="Preferences">
      <CurrencyAutocomplete
        defaultValue={currencies.find(c => c.code === user?.currency)}
        options={currencies.map(({ code, currency }) => ({ code, currency }))}
      />
    </Section>
  );
}
