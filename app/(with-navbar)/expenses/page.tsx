import Fab from '@/components/Fab';
import Link from 'next/link';
import ExpensesByCategoryChart from './_components/ExpensesByCategoryChart';
import Box from '@mui/material/Box';
import Heading from '@/components/Heading';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CategoryListItem from './_components/CategoryListItem';

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
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent sx={{ p: 0, '&:last-child': { pb: 1 } }}>
          <ExpensesByCategoryChart
            currency="MDL"
            data={[
              { value: 1048, name: 'Search Engine', color: 'yellow' },
              { value: 735.12, name: 'Direct', color: 'blue' },
              { value: 508, name: 'Email', color: 'green' },
            ]}
          />
        </CardContent>
      </Card>
      <Stack spacing={2} mt={2}>
        <CategoryListItem
          category={{
            id: 1,
            name: 'Category 1asdasdasdasdasdasdasdsd',
            icon: '/category-icons/school.svg',
            strokeColor: 'red',
            backgroundColor: 'blue',
            amount: 100000,
            percentage: 25,
          }}
          currency="MDL"
        />
      </Stack>
    </Box>
  );
}
