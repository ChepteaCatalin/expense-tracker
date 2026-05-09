import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function RootPage() {
  'use cache';
  return (
    <div>
      <h1>Dashboard</h1>
      <Box>
        <Link
          href={`/expenses/categories?month=${dayjs().format('YYYY-MM-DD')}`}
        >
          Go to Expenses by category
        </Link>
      </Box>
      <Box sx={{ mt: 3 }}>
        <Link
          href={`/incomes/categories?month=${dayjs().format('YYYY-MM-DD')}`}
        >
          Go to Income by category
        </Link>
      </Box>
    </div>
  );
}
