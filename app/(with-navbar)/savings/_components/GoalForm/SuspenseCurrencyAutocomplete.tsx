import Skeleton from '@mui/material/Skeleton';
import { Suspense } from 'react';
import CurrencyAutocomplete from './CurrencyAutocomplete';

export default function SuspenseCurrencyAutocomplete() {
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
      <CurrencyAutocomplete />
    </Suspense>
  );
}
