"use client";

import { type CategoryType } from "@/types/category";
import { useRouter, useSearchParams } from "next/navigation";
import { useOptimistic, useTransition } from "react";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "cn";

const CATEGORY_TYPES = [
  { label: "Expense", value: "expense", Icon: TrendingDown },
  { label: "Income", value: "income", Icon: TrendingUp },
] as const satisfies ReadonlyArray<{
  label: string;
  value: CategoryType;
  Icon: LucideIcon;
}>;

export default function TypeToggle() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [isNavigating, startNavigation] = useTransition();
  const [activeType, setActiveType] = useOptimistic(searchParams.get("type"));

  const activeIndex = Math.max(
    CATEGORY_TYPES.findIndex(({ value }) => value === activeType),
    0,
  );

  return (
    <nav aria-label="Category type" className="mb-2">
      <div className="border-primary/15 from-muted/80 to-muted/40 shadow-primary/5 relative grid grid-cols-2 rounded-xl border bg-linear-to-b p-1 shadow-lg backdrop-blur-sm">
        <span
          aria-hidden
          className={cn(
            "bg-primary/15 shadow-primary/25 ring-primary/30 absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-lg shadow-md ring-1 transition-transform duration-300 ease-out",
            activeIndex === 1 && "translate-x-full",
            isNavigating && "animate-pulse",
          )}
        />
        {CATEGORY_TYPES.map(({ label, value, Icon }) => {
          const isActive = value === activeType;

          return (
            <button
              key={value}
              type="button"
              aria-current={isActive ? "page" : undefined}
              onClick={() => {
                if (searchParams.get("type") !== value) {
                  startNavigation(() => {
                    setActiveType(value);
                    router.push(`/categories/all?type=${value}`);
                  });
                }
              }}
              className={cn(
                "relative z-10 flex cursor-pointer items-center justify-center gap-2 rounded-lg py-2 text-sm font-bold transition-colors duration-300 outline-none select-none",
                "focus-visible:ring-ring/60 focus-visible:ring-2",
                isActive
                  ? "text-primary dark:text-primary-light"
                  : "text-muted-foreground hover:text-primary dark:hover:text-primary-light",
              )}
            >
              {isActive && isNavigating ? (
                <Spinner />
              ) : (
                <Icon className="size-4" />
              )}
              {label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
