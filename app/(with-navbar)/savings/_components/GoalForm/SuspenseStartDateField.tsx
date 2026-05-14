import { Suspense } from 'react';
import StartDateField from './StartDateField';
import Skeleton from '@mui/material/Skeleton';

export default function SuspenseStartDateField() {
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
      <StartDateField />
    </Suspense>
  );
}
