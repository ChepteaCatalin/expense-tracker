"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import { cn } from "@/lib/utils";

export default function NavLink({
  href,
  Icon,
  text,
}: {
  href: string;
  Icon: React.ElementType;
  text: string;
}) {
  const segment = useSelectedLayoutSegment();
  const isActive = href.startsWith(`/${segment}`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-muted-foreground focus-visible:ring-ring flex flex-1 basis-0 flex-col items-center justify-center gap-0.5 rounded-[10px] px-1 py-1.5 transition-all duration-300 ease-in-out focus-visible:ring-2 focus-visible:outline-none lg:gap-1 lg:py-2",
        isActive
          ? "text-primary dark:text-primary-light bg-primary/8 shadow-primary/15 dark:bg-primary/25 dark:shadow-primary/20 shadow-[0_2px_8px]"
          : "hover:text-primary dark:hover:text-primary-light hover:bg-primary/5 dark:hover:bg-primary/10 hover:-translate-y-0.5",
      )}
    >
      <Icon className="size-5 lg:size-7" />
      <span className="text-xs leading-[1.2] font-semibold lg:text-sm lg:leading-[1.3]">
        {text}
      </span>
    </Link>
  );
}
