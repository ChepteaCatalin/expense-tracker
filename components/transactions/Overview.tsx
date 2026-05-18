import type { TransactionByCategorySearchParams } from '@/types/transaction';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { parsePeriod } from '@/utils/transactions/url';
import { readableCurrency } from '@/utils/currency';
import Stack from '@mui/material/Stack';
import type { ReadonlyURLSearchParams } from 'next/navigation';
import { getSession } from '@/data/auth';

export default async function Overview({
  searchParams,
  categoryName,
  categoryTotal,
}: {
  searchParams: TransactionByCategorySearchParams;
  categoryName: string | undefined;
  categoryTotal: number;
}) {
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
                  Object.entries(searchParams).flatMap(([key, value]) =>
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
          {readableCurrency(categoryTotal!)}
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
