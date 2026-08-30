"use client";

import Button from "@mui/material/Button";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { useState } from "react";
import { ReopenGoalDialog } from "./ReopenGoalDialog";

export default function ReopenGoalBtn({ id }: { id: number }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<RestartAltIcon />}
        fullWidth
        onClick={() => setOpen(true)}
      >
        Reopen
      </Button>
      {open && <ReopenGoalDialog id={id} handleClose={() => setOpen(false)} />}
    </>
  );
}
