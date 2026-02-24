import { requireAuthWithoutCache } from '@/lib/auth-utils';
import Section from '../_components/Section';
import Form from './Form';

export default async function PasswordPage() {
  const { user } = await requireAuthWithoutCache();

  if (user.emailVerified) return null;

  return (
    <Section title="Change Password">
      <Form key={user.id} />
    </Section>
  );
}
