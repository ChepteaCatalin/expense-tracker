import Fab from '@/components/Fab';
import Heading from '@/components/Heading';
import Box from '@mui/material/Box';

export const metadata = {
  title: 'Expenses',
  description: 'Track and organize your spending',
};

export default function ExpensesPage() {
  return (
    <Box>
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Fab />
    </Box>
  );
}
