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
  title: "Sign Up",
  description: "Create an account to manage your finances with Expense Tracker",
};

export default function SignUpPage() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Logo width={110} />
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your information below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form />
            <div className="text-muted-foreground mt-3 space-y-1 text-center">
              <p>
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-primary-light font-medium hover:underline"
                >
                  Sign In
                </Link>
              </p>
              <p>
                By signing up, you agree to our{" "}
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
