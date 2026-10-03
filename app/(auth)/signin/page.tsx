import Logo from "@/components/Logo";
import Form from "./Form";
import Link from "next/link";
import GitHubLink from "@/components/GitHubLink";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata = {
  title: "Sign In",
  description: "Sign in to manage your finances with Expense Tracker",
};

export default function SignInPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Logo width={110} />
        <Card>
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your credentials below to log in to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form />
            <div className="text-muted-foreground mt-3 space-y-1 text-center">
              <p>
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-primary-light font-medium hover:underline"
                >
                  Sign Up
                </Link>
              </p>
              <p>
                By signing in, you agree to our{" "}
                <Link
                  href="/privacy"
                  className="text-primary-light font-medium hover:underline"
                >
                  Privacy Policy
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-4 text-center">
          <GitHubLink />
        </div>
      </div>
    </div>
  );
}
