"use client";

import { startTransition, useState, useActionState, useEffect } from "react";
import { reopenSavingsGoal } from "../../../../actions";
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
import ActionErrorAlert from "@/components/ActionErrorAlert";
import { RotateCcw } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function ReopenGoal({ id }: { id: number }) {
  const [error, reopenGoalAction, isPending] = useActionState(
    reopenSavingsGoal,
    "",
  );

  const [open, setOpen] = useState(false);
  const [hideError, setHideError] = useState(false);

  useEffect(
    function closeOnSuccess() {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!isPending && error === undefined) setOpen(false);
    },
    [isPending, error],
  );

  return (
    <AlertDialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
        if (!open) setHideError(true);
      }}
    >
      <div className="w-full">
        <AlertDialogTrigger
          render={
            <Button variant="secondary" className="w-full">
              <RotateCcw data-icon="inline-start" /> Reopen
            </Button>
          }
        />
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Reopen Goal?</AlertDialogTitle>
          <ActionErrorAlert message={error} hide={hideError} className="my-1" />
          <AlertDialogDescription>
            While the goal is reopened, you will be able to make changes to it.
            You can mark it as completed later if needed.
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
                reopenGoalAction(id);
              });
            }}
            disabled={isPending}
          >
            <>
              {isPending && <Spinner data-icon="inline-start" />}
              Reopen
            </>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
