import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function ActionsButtons() {
  return (
    <Box
      sx={{
        p: { xs: 2, sm: 2.5 },
        borderRadius: 3,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'linear-gradient(145deg, color-mix(in srgb, var(--mui-palette-primary-main) 4%, transparent), transparent 65%)',
      }}
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ mb: 0.5, fontWeight: 600 }}
      >
        Goal Actions
      </Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        Keep this goal moving or remove it if you no longer need it.
      </Typography>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <Button variant="contained" startIcon={<AddIcon />} fullWidth>
          Add Deposit
        </Button>
        <Button
          variant="outlined"
          color="error"
          startIcon={<DeleteIcon />}
          fullWidth
        >
          Delete Goal
        </Button>
      </Stack>
    </Box>
  );
}
