import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";
import Section from "../_components/Section";
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

  return (
    <Section title="Change Password">
      <Form key={user.id} />
    </Section>
  );
}
