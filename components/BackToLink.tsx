import { cn } from "cn";
import Link from "next/link";
import type { UrlObject } from "url";
import { buttonVariants } from "./ui/button";
import { ChevronLeft } from "lucide-react";

export default function BackToLink({
  href,
  pageName,
  className,
}: {
  href: string | UrlObject;
  pageName?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(buttonVariants({ variant: "ghost" }), "mb-1", className)}
    >
      <ChevronLeft data-icon="inline-start" />
      {pageName ? `Back to ${pageName}` : "Back"}
    </Link>
  );
}
