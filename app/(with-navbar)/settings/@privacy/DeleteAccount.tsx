"use client";

import { Trash2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
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
import { startTransition, useActionState, useState } from "react";
import { deleteAccount } from "../actions";
import { Spinner } from "@/components/ui/spinner";
import ActionErrorAlert from "@/components/ActionErrorAlert";

const CONFIRMATION_TEXT = "delete my account";

export function DeleteAccount() {
  const [actionError, deleteAccountAction, isPending] = useActionState(
    deleteAccount,
    "",
  );

  const [canDelete, setCanDelete] = useState(false);
  const [hideError, setHideError] = useState(false);

  return (
    <AlertDialog
      onOpenChangeComplete={(isOpen) => {
        if (!isOpen) {
          setHideError(true);
          setCanDelete(false);
        }
      }}
    >
      <AlertDialogTrigger
        render={
          <Button variant="destructive">
            <Trash2Icon data-icon="inline-start" />
            Delete Account
          </Button>
        }
      />
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete Account?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your account and all associated data.
            This action cannot be undone.
          </AlertDialogDescription>
          <div>
            <p className="text-muted-foreground my-2 text-sm">
              Type
              <span className="text-foreground font-medium">
                {" "}
                {CONFIRMATION_TEXT}{" "}
              </span>
              below to confirm
            </p>
            <Input
              onChange={(e) =>
                setCanDelete(
                  e.target.value.toLowerCase().trim() === CONFIRMATION_TEXT,
                )
              }
              autoComplete="off"
            />
          </div>
          <ActionErrorAlert
            message={actionError}
            hide={hideError}
            className="mt-3 max-w-66.5"
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          {isPending ? (
            <AlertDialogAction variant="destructive" disabled>
              <Spinner data-icon="inline-start" />
              Deleting
            </AlertDialogAction>
          ) : (
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                setHideError(true);
                startTransition(() => {
                  setHideError(false);
                  deleteAccountAction();
                });
              }}
              disabled={!canDelete}
            >
              Delete
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
