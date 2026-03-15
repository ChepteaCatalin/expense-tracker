import Box from '@mui/material/Box';
import Link from 'next/link';
import LinkLabel from './LinkLabel';
import { CategoryType } from '@/types/category';

const CATEGORY_TYPES = [
  { label: 'Expense', value: 'expense' },
  { label: 'Income', value: 'income' },
] as const satisfies ReadonlyArray<{ label: string; value: CategoryType }>;

export default function TypeToggle() {
  return (
    <Box
      component="nav"
      sx={{
        display: 'flex',
        borderRadius: '10px',
        p: '4px',
        mb: '8px',
        gap: '4px',
        background: 'linear-gradient(145deg, #1c251f 0%, #1b231e 100%)',
        border: '1px solid rgba(30, 215, 96, 0.16)',
      }}
    >
      {CATEGORY_TYPES.map(categoryType => (
        <Link
          key={categoryType.value}
          href={{
            pathname: '/categories/all',
            query: { type: categoryType.value },
          }}
          style={{ textDecoration: 'none', flex: 1 }}
        >
          <LinkLabel
            href={`/categories/all?type=${categoryType.value}`}
            text={categoryType.label}
          />
        </Link>
      ))}
    </Box>
  );
}
