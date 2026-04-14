import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Link from 'next/link';
import Fab from '@/components/Fab';

export const metadata = {
  title: 'Expenses',
  description: 'Manage expenses for a specific category',
};

export default function ExpensesByCategoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading title={metadata.title} subtitle={metadata.description} />
      {children}
      <Link href="/expenses/new">
        <Fab />
      </Link>
    </Box>
  );
}
