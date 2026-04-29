'use client';

import Box from '@mui/material/Box';
import LinkLabel from './LinkLabel';
import { CategoryType } from '@/types/category';
import { useRouter, useSearchParams } from 'next/navigation';
import { useTransition } from 'react';
import LinearProgress from '@mui/material/LinearProgress';

const CATEGORY_TYPES = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
] as const satisfies ReadonlyArray<{ label: string; value: CategoryType }>;

export default function TypeToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isNavigating, startNavigation] = useTransition();

  return (
    <Box sx={{ mb: 0.5 }}>
      <Box
        component="nav"
        sx={{
          display: 'flex',
          borderRadius: '10px',
          p: '4px',
          gap: '4px',
          background: 'linear-gradient(145deg, #1c251f 0%, #1b231e 100%)',
          border: '1px solid rgba(30, 215, 96, 0.16)',
        }}
      >
        {CATEGORY_TYPES.map(categoryType => (
          <Box
            key={categoryType.value}
            role="button"
            onClick={() => {
              if (searchParams.get('type') !== categoryType.value) {
                startNavigation(() => {
                  router.push(`/categories/all?type=${categoryType.value}`);
                });
              }
            }}
            sx={{ flex: 1, cursor: 'pointer', userSelect: 'none' }}
          >
            <LinkLabel
              href={`/categories/all?type=${categoryType.value}`}
              text={categoryType.label}
            />
          </Box>
        ))}
      </Box>
      {isNavigating ? (
        <LinearProgress sx={{ mt: 0.5, borderRadius: '999px' }} />
      ) : (
        <Box sx={{ height: 4, mt: 0.5 }} />
      )}
    </Box>
  );
}
