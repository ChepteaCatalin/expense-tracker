import ExpensesByCategoryChart from '../_components/ExpensesByCategoryChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Stack from '@mui/material/Stack';
import CategoryListItem from '../_components/CategoryListItem';
import NoExpensesForPeriod from '../_components/NoExpensesForPeriod';
import { isValidPeriodParam } from '../_utils/url';
import { notFound } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

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
  searchParams: Promise<{ period: string }>;
}) {
  const { period } = await searchParams;

  if (!isValidPeriodParam(period)) notFound();

  return (
    <Box>
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent
          sx={{ p: 0, '&:last-child': { pb: 1 }, position: 'relative' }}
        >
          <IconButton
            aria-label="previous"
            sx={{ position: 'absolute', left: 0, top: 0, zIndex: 1 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <IconButton
            aria-label="previous"
            sx={{ position: 'absolute', right: 0, top: 0, zIndex: 1 }}
          >
            <ArrowForwardIcon />
          </IconButton>
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
