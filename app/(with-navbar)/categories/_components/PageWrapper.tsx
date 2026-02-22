import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

export default function PageWrapper({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <Box boxSizing="content-box" maxWidth="610px" mx="auto">
      <Heading title={title} subtitle={subtitle} />
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}
