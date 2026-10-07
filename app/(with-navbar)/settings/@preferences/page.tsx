import { currencies } from "@/data/currency";
import Section from "../_components/Section";
import CurrencyAutocomplete from "./CurrencyAutocomplete";
import { requireAuth } from "@/lib/auth-utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { type CategoryType } from "@/types/category";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";
import { buttonVariants } from "@/components/ui/button";

const DEFAULT_CATEGORY_TYPE: CategoryType = "expense";

export default function PreferencesPage() {
  return (
    <Section title="Preferences">
      <div className="flex flex-col gap-4">
        <ThemeToggle />
        <Suspense
          fallback={
            <div className="mb-1 flex flex-col gap-2">
              <p className="text-sm font-medium">Currency</p>
              <Skeleton className="h-8" />
            </div>
          }
        >
          <UserCurrencyAutocomplete />
        </Suspense>
        <Link
          href={{
            pathname: "/categories/all",
            query: { type: DEFAULT_CATEGORY_TYPE },
          }}
          className={buttonVariants({ variant: "default" })}
        >
          Manage Expense and Income Categories
        </Link>
      </div>
    </Section>
  );
}

async function UserCurrencyAutocomplete() {
  const { user } = await requireAuth();

  return (
    <CurrencyAutocomplete
      key={user.id}
      defaultValue={currencies.find((c) => c.code === user?.currency)}
      options={currencies.map(({ code, currency }) => ({ code, currency }))}
    />
  );
}
