import Link from "next/link";
import Section from "../_components/Section";
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Download } from "lucide-react";
import { DeleteAccount } from "./DeleteAccount";

export default function PrivacyPage() {
  return (
    <Section
      title="Privacy & Data"
      footer={
        <p className="mx-auto font-medium">
          Read how we handle your data in our{" "}
          <Link href="/privacy" className="text-primary-light hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      }
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            Download a copy of all your data (profile, categories, expenses,
            income, and savings) as a JSON file.
          </p>
          <a
            href="/api/export"
            className={cn(buttonVariants({ variant: "secondary" }), "w-full")}
          >
            <Download data-icon="inline-start" /> Export my Data
          </a>
        </div>
        <Separator />
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground">
            Permanently delete your account and all associated data — expenses,
            income, savings, and categories. This cannot be undone.
          </p>
          <DeleteAccount />
        </div>
      </div>
    </Section>
  );
}
