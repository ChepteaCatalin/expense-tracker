"use client";

import { startTransition, useState, useActionState, useEffect } from "react";
import { completeSavingsGoal } from "../../../../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ActionErrorAlert from "@/components/ActionErrorAlert";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { isBefore, startOfDay, startOfToday } from "date-fns";
import { Check } from "lucide-react";

export default function CompleteGoal({
  id,
  startDate,
}: {
  id: number;
  startDate: Date;
}) {
  const [error, completeGoalAction, isPending] = useActionState(
    completeSavingsGoal,
    "",
  );

  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  const disabled = isBefore(startOfToday(), startOfDay(startDate));

  useEffect(
    function closeOnSuccess() {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!isPending && error === undefined) setOpen(false);
    },
    [isPending, error],
  );

  if (disabled) {
    return (
      <Tooltip>
        <TooltipTrigger render={<div className="w-full" />}>
          <CompleteBtn disabled />
        </TooltipTrigger>
        <TooltipContent>
          <p>Goal cannot be completed before start date</p>
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) setHideError(true);
      }}
    >
      <div className="w-full">
        <AlertDialogTrigger render={<CompleteBtn />} />
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Complete Goal?</AlertDialogTitle>
          <ActionErrorAlert message={error} hide={hideError} className="my-1" />
          <AlertDialogDescription>
            While the goal is completed, you won’t be able to make any changes
            to it. You can reopen it later if needed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              setHideError(true);
              startTransition(() => {
                setHideError(false);
                completeGoalAction(id);
              });
            }}
            disabled={isPending}
          >
            <>
              {isPending && <Spinner data-icon="inline-start" />}
              Complete
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CompleteBtn(props: React.ComponentProps<typeof Button>) {
  return (
    <Button variant="secondary" className="w-full" {...props}>
      <Check data-icon="inline-start" /> Complete
    </Button>
  );
}
