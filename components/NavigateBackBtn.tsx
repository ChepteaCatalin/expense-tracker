"use client";

import Button from "@mui/material/Button";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { useRouter } from "next/navigation";
import type { SxProps, Theme } from "@mui/material/styles";

export default function NavigateBackBtn({
  pageName,
  fallbackHref = "/",
  sx,
}: {
  pageName?: string;
  fallbackHref?: string;
  sx?: SxProps<Theme>;
}) {
  const router = useRouter();

  const navigateBack = () => {
    if (window.history.length > 2) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <Button
      sx={{
        py: 0,
        px: 0.5,
        "& .MuiButton-startIcon": { mr: 0.5 },
        mb: 0.5,
        ...sx,
      }}
      startIcon={<ChevronLeftIcon />}
      onClick={navigateBack}
    >
      {pageName ? `Back to ${pageName}` : "Back"}
    </Button>
  );
}
