import Grid from '@mui/material/Grid';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { CategoryType } from '@/types/category';

export default function NoCategoriesFound({ type }: { type: CategoryType }) {
  return (
    <Grid container sx={{ alignItems: 'center', flexDirection: 'column' }}>
      <SearchOffIcon sx={{ fontSize: '60px', fill: 'rgb(210, 210, 210)' }} />
      <Typography>No {type} categories found</Typography>
      <Link href={{ pathname: '/categories/all', query: { type } }}>
        <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
          Add {capitalizeFirstLetter(type)} Categories
        </Button>
      </Link>
    </Grid>
  );
}

function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
