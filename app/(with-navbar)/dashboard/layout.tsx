import Heading from '@/components/Heading';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Dashboard',
  description: 'View your financial overview and insights.',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box>
      <Heading title={metadata.title} subtitle={metadata.description} />
      {children}
    </Box>
  );
}
