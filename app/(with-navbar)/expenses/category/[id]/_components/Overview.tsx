import { ExpensesByCategorySearchParams } from '@/types/expense';
import { validateParams } from '../utils';
import { getCategoryNameById } from '@/data/category';
import { notFound, redirect } from 'next/navigation';
import { UnauthorizedError } from '@/utils/error';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getSession } from '@/data/auth';
import { getExpenseCategoryTotal } from '@/data/expense';
import { dateFromSearchParams, parsePeriod } from '../../../_utils/url';
import { fromCents, readableCurrency } from '@/utils/currency';
import Stack from '@mui/material/Stack';
import type { ReadonlyURLSearchParams } from 'next/navigation';

export default async function Overview({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<ExpensesByCategorySearchParams>;
}) {
  const awaitedParams = await params;
  const awaitedSearchParams = await searchParams;

  validateParams(awaitedParams, awaitedSearchParams);

  try {
    var [categoryName, categoryTotal] = await Promise.all([
      getCategoryNameById(+awaitedParams.id),
      getExpenseCategoryTotal({
        categoryId: awaitedParams.id,
        ...dateFromSearchParams(awaitedSearchParams),
      }),
    ]);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect('/signin');
  }
  if (!categoryName) notFound();

  const currency = (await getSession())?.user.currency;

  return (
    <Card
      sx={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        background:
          'linear-gradient(145deg, rgba(30, 215, 96, 0.18) 0%, rgba(33, 33, 33, 0.95) 45%, rgba(18, 18, 18, 0.95) 100%)',
        boxShadow: '0 16px 38px rgba(0, 0, 0, 0.35)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -70,
          right: -70,
          width: 190,
          height: 190,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(30, 215, 96, 0.4), transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <CardContent sx={{ p: 3, '&.MuiCardContent-root:last-child': { pb: 3 } }}>
        <Stack
          direction="row"
          sx={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack spacing={0.75} sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              variant="overline"
              sx={{ letterSpacing: 1.1, color: 'rgba(255, 255, 255, 0.75)' }}
            >
              Category overview
            </Typography>
            <Typography
              variant="h5"
              component="p"
              sx={{
                lineHeight: 1.15,
                fontWeight: 700,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {categoryName}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {parsePeriod(
                new URLSearchParams(
                  Object.entries(awaitedSearchParams).flatMap(([key, value]) =>
                    typeof value === 'string' ? [[key, value]] : [],
                  ),
                ) as unknown as ReadonlyURLSearchParams,
              )}
            </Typography>
          </Stack>
        </Stack>
        <Typography
          variant="h3"
          component="p"
          sx={{ mt: 2.5, lineHeight: 1, fontWeight: 800 }}
        >
          {readableCurrency(fromCents(categoryTotal!))}
          <Box
            component="span"
            sx={{
              ml: 1,
              color: 'text.secondary',
              fontSize: '1.25rem',
              fontWeight: 500,
            }}
          >
            {currency}
          </Box>
        </Typography>
      </CardContent>
    </Card>
  );
}
