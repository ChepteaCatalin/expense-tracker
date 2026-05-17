import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';
import CurrencyAutocomplete from './CurrencyAutocomplete';
import type { CurrencyOption } from '@/types/currency';

export default function SuspenseCurrencyAutocomplete({
  defaultValue,
}: {
  defaultValue?: CurrencyOption;
}) {
  return (
    <Suspense
      fallback={
        <Skeleton
          variant="rectangular"
          height={40}
          sx={{ borderRadius: '4px' }}
        />
      }
    >
      <CurrencyAutocomplete defaultValue={defaultValue} />
    </Suspense>
  );
}
