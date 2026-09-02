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
      className={cn(
        "text-foreground flex flex-col items-center gap-0.5 rounded-[10px] p-1.5 transition-all duration-300 ease-in-out lg:gap-1 lg:px-4 lg:py-2",
        isActive
          ? "text-primary bg-[rgba(75,125,92,0.08)] shadow-[0_2px_8px_rgba(75,125,92,0.15)] dark:bg-[rgba(75,125,92,0.3)] dark:text-[#1ed760] dark:shadow-[0_2px_8px_rgba(30,215,96,0.2)]"
          : "hover:text-primary hover:-translate-y-0.5 hover:bg-[rgba(75,125,92,0.04)] dark:hover:bg-[rgba(30,215,96,0.03)] dark:hover:text-[#1ed760]",
      )}
    >
      <Icon className="size-5 lg:size-7" />
      <span className="text-xs leading-[1.2] font-semibold lg:text-sm lg:leading-[1.3]">
        {text}
      </span>
    </Link>
  );
}
