"use client";

import { startTransition, useActionState, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";
import { LogOut, AlertCircleIcon, X } from "lucide-react";
import { Alert, AlertAction, AlertTitle } from "@/components/ui/alert";

export default function SignOutBtn() {
  const [signOutUserError, signOutUserAction, isSignOutUserPending] =
    useActionState(signOut, null);

  const [hideAlert, setHideAlert] = useState(false);

  return (
    <div className="w-full">
      {!!signOutUserError && !hideAlert && (
        <ErrorAlert onClose={() => setHideAlert(true)} />
      )}
      <Button
        variant="destructive"
        className="w-full"
        disabled={isSignOutUserPending}
        onClick={() => {
          setHideAlert(true);
          startTransition(() => {
            setHideAlert(false);
            signOutUserAction();
          });
        }}
      >
        {isSignOutUserPending && <Spinner data-icon="inline-start" />}
        {isSignOutUserPending ? "Signing Out..." : "Sign Out"}
        <LogOut data-icon="inline-end" />
      </Button>
    </div>
  );
}

function ErrorAlert({ onClose }: { onClose: () => void }) {
  return (
    <Alert variant="destructive" className="mb-2">
      <AlertCircleIcon />
      <AlertTitle>Failed to sign out</AlertTitle>
      <AlertAction>
        <Button variant="ghost" size="icon-xs" onClick={onClose}>
          <X />
        </Button>
      </AlertAction>
    </Alert>
  );
}
