import BackBtnSkeleton from "@/components/BackBtnSkeleton";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";

export default function SavingsGoalDetailsLoading() {
  return (
    <Box>
      <BackBtnSkeleton />
      <Stack spacing={3}>
        <Skeleton variant="rectangular" height={330} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={106} sx={{ borderRadius: 3 }} />
        <Skeleton variant="rectangular" height={264} sx={{ borderRadius: 3 }} />
      </Stack>
    </Box>
  );
}
