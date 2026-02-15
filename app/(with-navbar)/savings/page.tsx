import Fab from '@/components/Fab';
import Heading from '@/components/Heading';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Savings',
  description: 'Set goals and watch your wealth grow',
};

export default function SavingsPage() {
  return (
    <Box>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Fab />
    </Box>
  );
}
