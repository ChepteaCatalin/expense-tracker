import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutlineRounded';
import InsightCard from './InsightCard';

export default function InsightError({
  title,
  retry,
}: {
  title: string;
  retry: () => void;
}) {
  return (
    <InsightCard title={title}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          py: 2,
        }}
      >
        <ErrorOutlineIcon
          sx={{ color: 'error.main', opacity: 0.8, fontSize: '60px' }}
        />
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: 'center', fontSize: '1rem' }}
        >
          Unable to load this insight
        </Typography>
        <Button size="small" variant="outlined" color="error" onClick={retry}>
          Try again
        </Button>
      </Box>
    </InsightCard>
  );
}
