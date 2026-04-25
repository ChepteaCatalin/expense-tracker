import Grid from '@mui/material/Grid';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function NoExpensesForPeriod() {
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
          <Typography>There are no expenses for the selected period</Typography>
          <Link href="/expenses/new">
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
              Add Expense
            </Button>
          </Link>
        </Grid>
      </CardContent>
    </Card>
  );
}
