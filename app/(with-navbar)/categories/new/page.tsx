import Heading from '@/components/Heading';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Form from '../_Form/Form';

export const metadata = {
  title: 'New Category',
  description: 'Create a category for expenses or income',
};

export default function NewCategoryPage() {
  return (
    <Box boxSizing="content-box" maxWidth="600px" mx="auto">
      <Heading title={metadata.title} subtitle={metadata.description} />
      <Card sx={{ borderRadius: '10px', pt: 1, px: 1 }}>
        <CardContent>
          <Form />
        </CardContent>
      </Card>
    </Box>
  );
}
