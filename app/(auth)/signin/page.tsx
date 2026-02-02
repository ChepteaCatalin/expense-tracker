import Link from 'next/link';

export default function SignInPage() {
  return (
    <div>
      <p>Sign In Page</p>
      <Link href="/signup">Go to Sign Up</Link>
    </div>
  );
}
