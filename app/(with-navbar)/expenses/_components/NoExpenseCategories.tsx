import Grid from '@mui/material/Grid';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';

export function NoExpenseCategories() {
  return (
    <Grid container direction="column" alignItems="center">
      <SearchOffIcon sx={{ fontSize: '60px', fill: 'rgb(210, 210, 210)' }} />
      <Typography>No expense categories found</Typography>
      <Link
        href={{
          pathname: '/categories/all',
          query: { type: 'expense' },
        }}
      >
        <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
          Add Expense Categories
        </Button>
      </Link>
    </Grid>
  );
}
