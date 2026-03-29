import Fab from '@/components/Fab';
import Link from 'next/link';
import ExpensesByCategoryChart from './_components/ExpensesByCategoryChart';
import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';

export const metadata = {
  title: 'Expenses',
  description: 'Track and organize your spending',
};

export default function ExpensesPage() {
  return (
    <Box boxSizing="content-box" maxWidth="610px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Link href="/expenses/new">
        <Fab />
      </Link>
      <Stack spacing={2}>
        <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
          <CardContent sx={{ p: 0, '&:last-child': { pb: 1 } }}>
            <ExpensesByCategoryChart
              currency="MDL"
              data={[
                { value: 1048, name: 'Search Engine' },
                { value: 735.12, name: 'Direct' },
                { value: 508, name: 'Email' },
                { value: 484, name: 'Union Ads' },
                { value: 300, name: 'Video Ads' },
              ]}
            />
          </CardContent>
        </Card>
        <Card sx={{ borderRadius: '10px' }}>
          <CardContent sx={{ pt: 1.25, '&:last-child': { pb: 1.25 } }}>
            1
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}
