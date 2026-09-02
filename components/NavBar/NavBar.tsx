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
    <nav className="fixed inset-x-0 bottom-0 z-50 bg-linear-to-t from-[#f4f4f4] to-[#ffffff] shadow-[0_-2px_8px_rgba(0,0,0,0.08)] dark:from-[#1a1a1a] dark:to-[#212121] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.3)]">
      <div className="flex min-h-12 items-center justify-center gap-3 px-4 py-1 lg:min-h-16 lg:gap-4 lg:py-2">
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
      className="invisible flex flex-col items-center gap-0.5 p-1.5 lg:gap-1 lg:px-4 lg:py-2"
      aria-hidden
    >
      <CircleDollarSign className="size-5 lg:size-7" />
      <span className="text-xs leading-[1.2] font-semibold lg:text-sm lg:leading-[1.3]">
        Expenses
      </span>
    </a>
  );
}
