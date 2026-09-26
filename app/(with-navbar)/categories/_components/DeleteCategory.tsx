"use client";

import { startTransition, useActionState, useState } from "react";
import ActionErrorAlert from "@/components/ActionErrorAlert";
import { deleteCategory } from "../actions";
import { type CategoryType } from "@/types/category";
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

export default function DeleteCategory({
  id,
  type,
}: {
  id: number;
  type: CategoryType;
}) {
  const [actionError, deleteAction, isPending] = useActionState(
    deleteCategory,
    "",
  );

  const [hideError, setHideError] = useState(false);

  return (
    <AlertDialog
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) setHideError(true);
      }}
    >
      <AlertDialogTrigger
        render={
          <Button variant="destructive" className="mt-3 w-full">
            <Trash2Icon data-icon="inline-start" />
            Delete
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Category?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this category. This action cannot be
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
                  deleteAction({ id, type });
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
