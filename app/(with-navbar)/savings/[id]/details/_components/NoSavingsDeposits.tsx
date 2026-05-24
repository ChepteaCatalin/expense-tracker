import Grid from '@mui/material/Grid';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function NoSavingsDeposits() {
  return (
    <Card
      sx={{
        borderRadius: 3,
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
          <Typography>There are no deposits yet</Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
