import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Heading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <Box sx={{ mb: 6 }}>
      <Typography
        variant="h3"
        component="h1"
        color="primary"
        sx={{ fontWeight: 700 }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography sx={{ color: 'text.secondary', fontWeight: 600 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
