import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';

export default function InsightCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card
      sx={{
        borderRadius: 4,
        border: BORDER,
        background:
          'linear-gradient(160deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%)',
      }}
    >
      <CardHeader
        title={title}
        slotProps={{
          title: {
            component: 'h2',
            sx: {
              fontSize: '1rem',
              fontWeight: 700,
            },
          },
        }}
        sx={{
          py: 1,
          borderBottom: BORDER,
        }}
      />
      <CardContent sx={{ '&.MuiCardContent-root': { p: 2 } }}>
        {children}
      </CardContent>
    </Card>
  );
}

const BORDER = '1px solid rgba(255, 255, 255, 0.1)';
