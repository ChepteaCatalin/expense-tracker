import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import { iconsList } from './icons-list';

export default function Icons() {
  return (
    <Box>
      <Typography color="text.secondary">Icon</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, 40px)',
          maxHeight: '40vh',
          overflowY: 'auto',
          justifyContent: 'center',
          gap: 3,
          mt: 0.5,
        }}
      >
        {iconsList.map(icon => (
          <Image
            key={icon.src}
            src={icon.src}
            alt={icon.alt}
            width={40}
            height={40}
          />
        ))}
      </Box>
    </Box>
  );
}
