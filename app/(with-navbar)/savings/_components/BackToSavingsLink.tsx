import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Button from "@mui/material/Button";
import Link from "next/link";

export function BackToSavingsLink() {
  return (
    <Link href="/savings">
      <Button
        sx={{
          py: 0,
          px: 0.5,
          "& .MuiButton-startIcon": { mr: 0.5 },
          mb: 0.5,
        }}
        startIcon={<ChevronLeftIcon />}
      >
        Savings
      </Button>
    </Link>
  );
}
