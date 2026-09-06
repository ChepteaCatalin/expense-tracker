"use client";

import { startTransition, useActionState, useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { signOut } from "../actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import ActionErrorAlert from "@/components/ActionErrorAlert";

export default function SignOutBtn() {
  const [signOutUserError, signOutUserAction, isSignOutUserPending] =
    useActionState(signOut, null);

  const [hideAlert, setHideAlert] = useState(false);

  return (
    <div className="w-full">
      {!!signOutUserError && !hideAlert && (
        <ActionErrorAlert
          message="Failed to sign out"
          onClose={() => setHideAlert(true)}
          className="mb-2"
        />
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
