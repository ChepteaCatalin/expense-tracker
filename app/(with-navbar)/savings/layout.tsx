import Heading from '@/components/Heading';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Savings',
  description: 'Set goals and watch your wealth grow',
};

export default function SavingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ boxSizing: 'content-box', maxWidth: '610px', mx: 'auto' }}>
      <Heading
        title={metadata.title}
        subtitle={metadata.description}
        sx={{ mb: 5 }}
      />
      {children}
    </Box>
  );
}
