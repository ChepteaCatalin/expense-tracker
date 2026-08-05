import { requireAuth } from '@/lib/auth-utils';
import { Suspense } from 'react';
import Section from '../_components/Section';
import ChangePasswordSkeleton from '../_components/ChangePasswordSkeleton';
import Form from './Form';

export default function PasswordPage() {
  return (
    <Suspense fallback={<ChangePasswordSkeleton />}>
      <ChangePassword />
    </Suspense>
  );
}

// The whole section depends on the session: it renders only for
// non-verified-email (credentials) accounts.
async function ChangePassword() {
  const { user } = await requireAuth();

  if (user.emailVerified) return null;

  return (
    <Section title="Change Password">
      <Form key={user.id} />
    </Section>
  );
}
