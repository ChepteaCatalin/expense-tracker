import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { categoryIcons } from '@/utils/category-icons';
import Grid from '@mui/material/Grid';
import { TransactionCategoryListItem } from '@/types/transaction';
import { readableCurrency } from '@/utils/currency';
import Link from 'next/link';
import {
  SortTransactionBy,
  TransactionCategoriesSearchParams,
} from '@/types/transaction';

export default function CategoryListItem({
  type,
  category,
  currency,
  searchParams,
}: {
  type: 'expenses' | 'incomes';
  category: TransactionCategoryListItem;
  currency: string;
  searchParams: TransactionCategoriesSearchParams;
}) {
  const Icon = categoryIcons.find(
    icon => icon.src === category.icon,
  )?.Component;

  return (
    <Link
      href={{
        pathname: `/${type}/category/${category.id}`,
        query: {
          ...searchParams,
          sortBy: 'date' satisfies SortTransactionBy,
        } as Record<string, string | string[]>,
      }}
      style={{ textDecoration: 'none' }}
    >
      <Card
        role="button"
        sx={{
          borderRadius: '12px',
          cursor: 'pointer',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.08)',
          background:
            'linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
          boxShadow: '0 8px 20px rgba(0, 0, 0, 0.16)',
          transition:
            'transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease, background-color 180ms ease',
          '&:hover': {
            bgcolor: 'action.hover',
            borderColor: 'rgba(255, 255, 255, 0.14)',
            transform: 'translateY(-1px)',
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.22)',
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            p: 1.35,
            '&:last-child': { pb: 1.35 },
          }}
        >
          <Grid
            container
            sx={{ alignItems: 'center', gap: 1.1, flexWrap: 'nowrap' }}
          >
            {Icon && (
              <Icon
                style={{
                  width: '32px',
                  height: '32px',
                  fontSize: '32px',
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
                fontWeight: 600,
                letterSpacing: 0.15,
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {category.name}
            </Typography>
          </Grid>
          <Grid
            container
            sx={{
              gap: 1.25,
              flexWrap: 'nowrap',
              flex: 'none',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.8125rem',
                color: 'rgba(123, 211, 137, 0.95)',
                whiteSpace: 'nowrap',
                lineHeight: 1,
                fontWeight: 600,
                px: 0.7,
                py: 0.3,
                borderRadius: 999,
                bgcolor: 'rgba(30, 215, 96, 0.14)',
                border: '1px solid rgba(30, 215, 96, 0.24)',
              }}
            >
              {category.percentage.toFixed(2)}%
            </Typography>
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 700,
                color: 'success.light',
                whiteSpace: 'nowrap',
              }}
            >
              {`${readableCurrency(category.amount)} ${currency}`}
            </Typography>
          </Grid>
        </CardContent>
      </Card>
    </Link>
  );
}
