import Box from '@mui/material/Box';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function GitHubLink() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Link
        href="https://github.com/ChepteaCatalin/expense-tracker"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          px: 3,
          py: 1.25,
          borderRadius: '999px',
          border: '1px solid',
          borderColor: 'rgba(255,255,255,0.08)',
          color: 'text.secondary',
          bgcolor: 'rgba(255,255,255,0.03)',
          transition: 'all 0.2s ease',
          '&:hover': {
            borderColor: 'primary.main',
            color: 'primary.main',
            bgcolor: 'rgba(30,215,96,0.06)',
          },
        }}
      >
        <GitHubIcon sx={{ fontSize: '1.1rem' }} />
        <Typography variant="body2" component="span" sx={{ fontWeight: 500 }}>
          View source code on GitHub
        </Typography>
      </Link>
    </Box>
  );
}
