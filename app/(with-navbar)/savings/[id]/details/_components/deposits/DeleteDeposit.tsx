"use client";

import { startTransition, useActionState, useState } from "react";
import { deleteSavingsDeposit } from "../../../../actions";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import ActionErrorAlert from "@/components/ActionErrorAlert";

export default function DeleteDeposit({
  id,
  isGoalCompleted,
}: {
  id: number;
  isGoalCompleted: boolean;
}) {
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteSavingsDeposit,
    "",
  );

  return (
    <AlertDialog
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) setHideError(true);
      }}
    >
      <AlertDialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Delete deposit"
            disabled={isGoalCompleted}
          >
            <Trash2Icon />
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Deposit?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this deposit. This action cannot be
            undone.
          </AlertDialogDescription>
          <ActionErrorAlert
            message={actionError}
            hide={hideError}
            className="mt-2"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          {isPending ? (
            <AlertDialogAction variant="destructive" disabled>
              <Spinner data-icon="inline-start" />
              Deleting...
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setHideError(true);
                startTransition(() => {
                  setHideError(false);
                  deleteAction(id);
                });
              }}
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
