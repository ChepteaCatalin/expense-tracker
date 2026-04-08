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
import type {
  ExpenseCategoriesSearchParams,
  ExpenseCategory,
} from '@/types/expense';
import { getExpenseCategories } from '@/data/expense';
import { UnauthorizedError } from '@/utils/error';
import { getSession } from '@/data/auth';

export default async function ExpenseCategoriesPage({
  searchParams,
}: {
  searchParams: Promise<ExpenseCategoriesSearchParams>;
}) {
  if (!validSearchParams(await searchParams)) notFound();

  var expensesByCategory = [] as ExpenseCategory[];
  try {
    expensesByCategory = await getExpenseCategories(
      dateFromSearchParams(await searchParams),
    );
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }

  const session = await getSession();
  const currency = session!.user.currency;
  const categoryPercentages = getCategoryPercentages(expensesByCategory);

  return (
    <Box>
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent
          sx={{ p: 0, '&:last-child': { pb: 1 }, position: 'relative' }}
        >
          <DateNavButtons />
          <ExpensesByCategoryChart
            currency={currency}
            data={expensesByCategory.map(category => ({
              name: category.name,
              value: category.totalAmount,
              color: category.backgroundColor,
            }))}
          />
        </CardContent>
      </Card>
      <Stack spacing={1.25} mt={2}>
        {!expensesByCategory.length ? (
          <NoExpensesForPeriod />
        ) : (
          expensesByCategory.map(c => (
            <CategoryListItem
              key={c.categoryId}
              category={{
                id: c.categoryId,
                name: c.name,
                icon: c.icon,
                strokeColor: c.strokeColor,
                backgroundColor: c.backgroundColor,
                amount: c.totalAmount,
                percentage: categoryPercentages[c.categoryId],
              }}
              currency={currency}
            />
          ))
        )}
      </Stack>
    </Box>
  );
}

function getCategoryPercentages(expensesByCategory: ExpenseCategory[]) {
  const expensesSum = expensesByCategory.reduce(
    (sum, c) => sum + c.totalAmount,
    0,
  );

  return expensesByCategory.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.categoryId]:
        expensesSum === 0 ? 0 : (curr.totalAmount / expensesSum) * 100,
    }),
    {} as { [key: string]: number },
  );
}
