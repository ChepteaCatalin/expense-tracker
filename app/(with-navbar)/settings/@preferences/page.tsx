import { currencies } from '@/data/currency';
import Section from '../_components/Section';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import { requireAuthWithoutCache } from '@/lib/auth-utils';

export default async function PreferencesPage() {
  const { user } = await requireAuthWithoutCache();

  return (
    <Section title="Preferences">
      <CurrencyAutocomplete
        key={user.id}
        defaultValue={currencies.find(c => c.code === user?.currency)}
        options={currencies.map(({ code, currency }) => ({ code, currency }))}
      />
    </Section>
  );
}
