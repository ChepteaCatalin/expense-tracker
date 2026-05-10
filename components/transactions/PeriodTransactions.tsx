import { getSession } from '@/data/auth';
import type { TransactionsByDate } from '@/types/transaction';
import { categoryIcons } from '@/utils/category-icons';
import { readableCurrency } from '@/utils/currency';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import Link from 'next/link';

export default async function PeriodTransactions({
  type,
  transactions,
  searchParams,
}: {
  type: 'incomes' | 'expenses';
  transactions: TransactionsByDate;
  searchParams: string;
}) {
  const currency = (await getSession())?.user.currency;
  const Icon = categoryIcons.find(
    icon => icon.src === transactions.icon,
  )?.Component;

  return (
    <Box>
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 600,
          ml: 1,
          color: 'text.pale',
          letterSpacing: 0.2,
        }}
      >
        {dayjs(transactions.date).format('D MMMM YYYY')}
      </Typography>
      <Card
        sx={{
          borderRadius: '14px',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.1)',
          background:
            'linear-gradient(160deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%)',
          boxShadow: '0 10px 24px rgba(0, 0, 0, 0.2)',
        }}
      >
        <CardContent sx={{ '&.MuiCardContent-root': { p: 1.25 } }}>
          <Stack spacing={0.5}>
            {transactions.transactions.map((transactionItem, index) => (
              <Box key={transactionItem.id}>
                <Link
                  href={`/${type}/${transactionItem.id}/edit?${searchParams}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Box
                    role="button"
                    sx={{
                      cursor: 'pointer',
                      px: 0.75,
                      py: 0.5,
                      borderRadius: 1.5,
                      transition:
                        'background-color 180ms ease, transform 180ms ease, box-shadow 180ms ease',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        transform: 'translateX(2px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                      },
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'nowrap',
                      }}
                    >
                      <Grid
                        container
                        spacing={1}
                        sx={{ flexWrap: 'nowrap', alignItems: 'center' }}
                      >
                        {Icon && (
                          <Icon
                            style={{
                              width: '32px',
                              height: '32px',
                              fontSize: '32px',
                              padding: '3px',
                              borderRadius: '50%',
                              backgroundColor: transactions.backgroundColor,
                              fill: transactions.strokeColor,
                              flex: 'none',
                            }}
                          />
                        )}
                        <Typography
                          sx={{
                            color: 'text.pale',
                            fontWeight: 500,
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {transactions.categoryName}
                        </Typography>
                      </Grid>
                      <Typography
                        sx={{
                          fontWeight: 700,
                          color: 'success.light',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {`${readableCurrency(transactionItem.amount)} ${currency}`}
                      </Typography>
                    </Grid>
                    <Typography
                      sx={{
                        color: 'text.secondary',
                        fontSize: '0.8125rem',
                        mt: 0.25,
                      }}
                    >
                      {transactionItem.description}
                    </Typography>
                  </Box>
                </Link>
                {index !== transactions.transactions.length - 1 && (
                  <Divider
                    sx={{ mt: 0.5, borderColor: 'rgba(255, 255, 255, 0.08)' }}
                  />
                )}
              </Box>
            ))}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
