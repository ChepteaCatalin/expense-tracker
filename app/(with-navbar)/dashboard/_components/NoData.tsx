import InsightCard from './InsightCard';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';

export default function NoData({
  title,
  link,
  customLink,
}: {
  title: string;
  link?: { href: string; text: string };
  customLink?: React.ReactNode;
}) {
  return (
    <InsightCard title={title}>
      <Grid
        container
        sx={{
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <SearchOffIcon sx={{ fontSize: '60px', fill: 'rgb(210, 210, 210)' }} />
        <Typography>No data found for this insight</Typography>
        {link && (
          <Link href={link.href}>
            <Button variant="outlined" startIcon={<AddIcon />} sx={{ mt: 1.5 }}>
              {link.text}
            </Button>
          </Link>
        )}
        {customLink}
      </Grid>
    </InsightCard>
  );
}
