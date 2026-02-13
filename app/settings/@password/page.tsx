import { requireAuth } from '@/lib/auth-utils';
import Section from '../_components/Section';
import ChangePasswordForm from './ChangePasswordForm';

export default async function PasswordPage() {
  const { user } = await requireAuth();

  if (user.emailVerified) return null;

  return (
    <Section title="Change Password">
      <ChangePasswordForm />
    </Section>
  );
}
