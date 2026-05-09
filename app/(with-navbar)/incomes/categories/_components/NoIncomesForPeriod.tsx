import Grid from '@mui/material/Grid';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { TransactionCategoriesSearchParams } from '@/types/transaction';
import { stringifySearchParams } from '@/utils/transactions/url';

export default function NoIncomesForPeriod({
  searchParams,
}: {
  searchParams: TransactionCategoriesSearchParams;
}) {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        background:
          'linear-gradient(160deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.015) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <CardContent>
        <Grid container sx={{ alignItems: 'center', flexDirection: 'column' }}>
          <SearchOffIcon
            sx={{ fontSize: '60px', fill: 'rgb(210, 210, 210)' }}
          />
          <Typography>There are no incomes for the selected period</Typography>
          <Link href={`/incomes/new?${stringifySearchParams(searchParams)}`}>
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
              Add Income
            </Button>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  );
}
