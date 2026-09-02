import NavLink from "./NavLink";
import {
  CircleDollarSign,
  LayoutDashboard,
  PiggyBank,
  Settings,
} from "./icons";
import { Suspense } from "react";
import ExpensesNavLink from "./ExpensesNavLink";
import IncomeNavLink from "./IncomeNavLink";

export default function NavBar() {
  return (
    <nav
      aria-label="Primary"
      className="bg-background/95 supports-backdrop-filter:bg-background/80 fixed inset-x-0 bottom-0 z-50 border-t shadow-[0_-2px_8px_rgba(0,0,0,0.04)] backdrop-blur-lg dark:shadow-[0_-2px_8px_rgba(0,0,0,0.3)]"
    >
      <div className="mx-auto flex min-h-12 w-full max-w-md items-stretch gap-1 px-2 pt-1 pb-[calc(0.25rem+env(safe-area-inset-bottom))] lg:min-h-16 lg:max-w-2xl lg:gap-2 lg:px-4 lg:pt-2 lg:pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
        <Suspense fallback={<NavBarFallback />}>
          <NavLink href="/dashboard" Icon={LayoutDashboard} text="Dashboard" />
          <ExpensesNavLink />
          <IncomeNavLink />
          <NavLink href="/savings" Icon={PiggyBank} text="Savings" />
          <NavLink href="/settings" Icon={Settings} text="Settings" />
        </Suspense>
      </div>
    </nav>
  );
}

function NavBarFallback() {
  return (
    <a
      className="invisible flex flex-1 basis-0 flex-col items-center justify-center gap-0.5 px-1 py-1.5 lg:gap-1 lg:py-2"
      aria-hidden
    >
      <CircleDollarSign className="size-5 lg:size-7" />
      <span className="text-xs leading-[1.2] font-semibold lg:text-sm lg:leading-[1.3]">
        Expenses
      </span>
    </a>
  );
}
