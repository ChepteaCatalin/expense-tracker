import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";
import LoadingFallback from "./LoadingFallback";
import Form from "./Form";

export default function PasswordPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ChangePassword />
    </Suspense>
  );
}

async function ChangePassword() {
  const { user } = await requireAuth();

  if (user.emailVerified) return null;

  return <Form key={user.id} />;
}
