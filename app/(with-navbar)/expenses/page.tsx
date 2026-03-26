import Fab from '@/components/Fab';
import Link from 'next/link';
import ExpensesByCategoryChart from './_components/ExpensesByCategoryChart';
import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export const metadata = {
  title: 'Expenses',
  description: 'Track and organize your spending',
};

export default function ExpensesPage() {
  return (
    <Box boxSizing="content-box" maxWidth="700px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent sx={{ p: 0, pb: '8px !important' }}>
          <ExpensesByCategoryChart currency="MDL" />
          <Link href="/expenses/new">
            <Fab />
          </Link>
        </CardContent>
      </Card>
    </Box>
  );
}
