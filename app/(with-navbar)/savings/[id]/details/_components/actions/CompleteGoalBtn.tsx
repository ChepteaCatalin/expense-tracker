'use client';

import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from 'react';
import { CompleteGoalDialog } from './CompleteGoalDialog';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import Tooltip from '@mui/material/Tooltip';

export default function CompleteGoalBtn({
  id,
  startDate,
}: {
  id: number;
  startDate: Date;
}) {
  const [open, setOpen] = useState(false);

  const disabled = dayjs()
    .startOf('day')
    .isBefore(dayjs(startDate).startOf('day'));

  return (
    <>
      <Tooltip
        arrow
        title={disabled ? 'Goal cannot be completed before start date' : ''}
        disableHoverListener={!disabled}
      >
        <Box sx={{ width: '100%' }}>
          <Button
            variant="outlined"
            startIcon={<CheckIcon />}
            fullWidth
            onClick={() => setOpen(true)}
            disabled={disabled}
          >
            Complete
          </Button>
        </Box>
      </Tooltip>
      {open && (
        <CompleteGoalDialog id={id} handleClose={() => setOpen(false)} />
      )}
    </>
  );
}
