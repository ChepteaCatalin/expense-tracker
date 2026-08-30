import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SavingsGoalDetailsLoading() {
  return (
    <Box>
      <Skeleton
        variant="rectangular"
        width={88}
        height={28}
        sx={{ borderRadius: 1, mb: 0.5 }}
      />
      <Stack spacing={3}>
        <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={106} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={264} sx={{ borderRadius: 3 }} />
      </Stack>
    </Box>
  );
}
