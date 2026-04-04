import ExpensesByCategoryChart from '../_components/ExpensesByCategoryChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CategoryListItem from '../_components/CategoryListItem';
import NoExpensesForPeriod from '../_components/NoExpensesForPeriod';
import { dateFromSearchParams, validSearchParams } from '../_utils/url';
import { notFound, redirect } from 'next/navigation';
import Box from '@mui/material/Box';
import DateNavButtons from '../_components/DateNavButtons';
import type { ExpenseByCategorySearchParams } from '@/types/expense';
import { getExpensesCategories } from '@/data/expense';
import { UnauthorizedError } from '@/utils/error';

const categories = [
  {
    id: 1,
    name: 'Category 1asdasdasdasdasdasdasdsd',
    icon: '/category-icons/school.svg',
    strokeColor: 'red',
    backgroundColor: 'blue',
    amount: 100000,
    percentage: 25,
  },
];

export default async function ExpensesByCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<ExpenseByCategorySearchParams>;
}) {
  if (!validSearchParams(await searchParams)) notFound();

  try {
    var expensesByCategory = await getExpensesCategories(
      dateFromSearchParams(await searchParams),
    );
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  return (
    <Box>
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent
          sx={{ p: 0, '&:last-child': { pb: 1 }, position: 'relative' }}
        >
          <DateNavButtons />
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
      <Stack spacing={1.25} mt={2}>
        {!categories?.length ? (
          <NoExpensesForPeriod />
        ) : (
          categories.map(category => (
            <CategoryListItem
              key={category.id}
              category={category}
              currency="MDL"
            />
          ))
        )}
      </Stack>
    </Box>
  );
}
