import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { categoryIcons } from '@/utils/category-icons';
import Grid from '@mui/material/Grid';
import {
  ExpenseCategoriesSearchParams,
  ExpenseCategoryListItem,
  SortExpenseBy,
} from '@/types/expense';
import { fromCents, readableCurrency } from '@/utils/currency';
import Link from 'next/link';

export default function CategoryListItem({
  category,
  currency,
  searchParams,
}: {
  category: ExpenseCategoryListItem;
  currency: string;
  searchParams: ExpenseCategoriesSearchParams;
}) {
  const Icon = categoryIcons.find(
    icon => icon.src === category.icon,
  )?.Component;

  return (
    <Link
      href={{
        pathname: `/expenses/category/${category.id}`,
        query: {
          ...searchParams,
          sortBy: 'date' satisfies SortExpenseBy,
        } as Record<string, string | string[]>,
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        role="button"
        sx={{
          borderRadius: '10px',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            p: 1.25,
            '&:last-child': { pb: 1.25 },
          }}
        >
          <Grid
            container
            sx={{ alignItems: 'center', gap: 1, flexWrap: 'nowrap' }}
          >
            {Icon && (
              <Icon
                style={{
                  width: '32px',
                  height: '32px',
                  fontWeight: '32px',
                  padding: '3px',
                  borderRadius: '50%',
                  backgroundColor: category.backgroundColor,
                  fill: category.strokeColor,
                  flex: 'none',
                }}
              />
            )}
            <Typography
              sx={{
                color: 'text.pale',
                fontSize: '0.875rem',
                fontWeight: 500,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {category.name}
            </Typography>
          </Grid>
          <Grid container sx={{ gap: 2.5, flexWrap: 'nowrap', flex: 'none' }}>
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: 'text.secondary',
                whiteSpace: 'nowrap',
                lineHeight: '21px',
              }}
            >
              {category.percentage.toFixed(2)}%
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 500,
                color: 'text.pale',
                whiteSpace: 'nowrap',
              }}
            >
              {`${readableCurrency(fromCents(category.amount))} ${currency}`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
