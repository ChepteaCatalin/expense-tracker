import { currencies } from '@/data/currency';
import CurrencyAutocompleteField from './CurrencyAutocompleteField';
import { getSession } from '@/data/auth';

export default async function CurrencyAutocomplete({
  isEditMode,
}: {
  isEditMode: boolean;
}) {
  const currency =
    (await getSession().catch(() => null))?.user?.currency ?? 'MDL';

  return (
    <CurrencyAutocompleteField
      currencyOptions={currencies.map(({ code, currency }) => ({
        code,
        currency,
      }))}
      isEditMode={isEditMode}
      defaultValue={currencies.find(c => c.code === currency)}
    />
  );
}
