"use client";

import type {
  DeleteTransactionAction,
  TransactionType,
} from "@/types/transaction";
import { startTransition, useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
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
import { capitalizeFirstLetter } from "@/utils/string";

interface DeleteTransactionProps {
  id: number;
  type: TransactionType;
  action: DeleteTransactionAction;
}

export default function DeleteTransaction({
  id,
  type,
  action,
}: DeleteTransactionProps) {
  const searchParams = useSearchParams();

  const [hideError, setHideError] = useState(false);

  const [actionError, deleteAction, isPending] = useActionState(
    action.bind(null, searchParams.toString()),
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
          <Button variant="destructive" className="w-full">
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
          <AlertDialogTitle>
            Delete {capitalizeFirstLetter(type)}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this {type}. This action cannot be
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
              Delete
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setHideError(true);
                startTransition(() => {
                  setHideError(false);
                  deleteAction({ id });
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
