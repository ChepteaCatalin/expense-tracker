"use client";

import BackToLink from "@/components/BackToLink";
import { useSearchParams } from "next/navigation";

export default function BackToCategoriesBtn({
  type,
  className,
}: {
  type: "expenses" | "incomes";
  className?: string;
}) {
  const searchParams = useSearchParams();

  const backBtnSearchParams = new URLSearchParams(searchParams.toString());
  backBtnSearchParams.delete("sortBy");

  return (
    <BackToLink
      href={`/${type}/categories?${backBtnSearchParams.toString()}`}
      className={className}
    />
  );
}
