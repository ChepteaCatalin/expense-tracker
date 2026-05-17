import { currencies } from '@/data/currency';
import CurrencyAutocompleteField from './CurrencyAutocompleteField';
import { getSession } from '@/data/auth';
import type { CurrencyOption } from '@/types/currency';

export default async function CurrencyAutocomplete({
  defaultValue,
}: {
  defaultValue?: CurrencyOption;
}) {
  const currency =
    (await getSession().catch(() => null))?.user?.currency ?? 'MDL';

  return (
    <CurrencyAutocompleteField
      currencyOptions={currencies.map(({ code, currency }) => ({
        code,
        currency,
      }))}
      defaultValue={defaultValue ?? currencies.find(c => c.code === currency)!}
    />
  );
}
