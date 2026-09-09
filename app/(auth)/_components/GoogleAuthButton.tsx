"use client";

import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/auth-client";
import GoogleIcon from "@/public/google.svg";

export default function GoogleAuthButton() {
  return (
    <Button onClick={signInWithGoogle} className="w-full" variant="outline">
      <GoogleIcon data-icon="inline-start" /> Continue with Google
    </Button>
  );
}
