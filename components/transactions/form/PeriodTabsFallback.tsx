import Skeleton from "@mui/material/Skeleton";

export default function PeriodTabsFallback() {
  return (
    <Skeleton
      variant="rectangular"
      sx={{
        height: "32px",
        mt: -1,
        mb: 1.5,
        borderRadius: "4px",
        width: "350px",
        mx: "auto",
      }}
    />
  );
}
