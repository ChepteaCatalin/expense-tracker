"use client";

import { useActionState, useState, startTransition } from "react";
import { deleteSavingsGoal } from "../../../../actions";
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

export default function DeleteGoal({ id }: { id: number }) {
  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    deleteSavingsGoal,
    "",
  );

  return (
    <AlertDialog
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) setHideError(true);
      }}
    >
      <div className="w-full">
        <AlertDialogTrigger
          render={
            <Button variant="destructive" className="w-full">
              <Trash2Icon data-icon="inline-start" />
              Delete
            </Button>
          }
        />
      </div>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Goal?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this goal. This action cannot be
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
