import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function Section({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <Box component="section">
      <Typography
        component="h2"
        sx={{ fontSize: '1.75rem', fontWeight: 700, mb: 0.5 }}
      >
        {title}
      </Typography>
      <Card sx={{ borderRadius: '10px' }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}
