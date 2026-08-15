import { requireAuth } from "@/lib/auth-utils";
import { Suspense } from "react";
import SignOutBtn from "./SignOutBtn";
import Section from "../_components/Section";
import LoadingFallback from "./LoadingFallback";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function AccountPage() {
  return (
    <Section title="Account" footer={<SignOutBtn />}>
      <Suspense fallback={<LoadingFallback />}>
        <AccountDetails />
      </Suspense>
    </Section>
  );
}

async function AccountDetails() {
  const { user } = await requireAuth();

  return (
    <div className="flex items-center gap-4">
      <Avatar size="lg">
        <AvatarImage
          src={user.image || undefined}
          alt={`${user.name} avatar`}
        />
        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="text-base font-semibold">{user.name}</p>
        <p className="text-muted-foreground">{user.email}</p>
      </div>
    </div>
  );
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
