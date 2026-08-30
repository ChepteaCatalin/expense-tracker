import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DeleteGoalBtn from "./DeleteGoalBtn";
import Link from "next/link";
import type { SavingsGoal } from "@/types/savings";
import CompleteGoalBtn from "./CompleteGoalBtn";
import ReopenGoalBtn from "./ReopenGoalBtn";
import Stack from "@mui/material/Stack";

export default function ActionsButtons({ goal }: { goal: SavingsGoal }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        background:
          "linear-gradient(145deg, color-mix(in srgb, var(--mui-palette-primary-main) 4%, transparent), transparent 65%)",
      }}
    >
      <Typography
        variant="subtitle1"
        component="p"
        sx={{ mb: 2, fontWeight: 600, lineHeight: 1 }}
      >
        Goal Actions
      </Typography>
      <Stack direction="row" spacing={1.5}>
        {goal.isCompleted ? (
          <Box sx={{ width: "100%" }}>
            <EditGoalBtn disabled />
          </Box>
        ) : (
          <Link href={`/savings/${goal.id}/edit`} style={{ width: "100%" }}>
            <EditGoalBtn />
          </Link>
        )}
        {goal.isCompleted ? (
          <ReopenGoalBtn id={goal.id} />
        ) : (
          <CompleteGoalBtn id={goal.id} startDate={goal.startDate} />
        )}
        <DeleteGoalBtn id={goal.id} name={goal.name} />
      </Stack>
    </Box>
  );
}

function EditGoalBtn({ disabled }: { disabled?: boolean }) {
  return (
    <Button
      variant="outlined"
      startIcon={<EditIcon />}
      fullWidth
      disabled={disabled}
    >
      Edit
    </Button>
  );
}
