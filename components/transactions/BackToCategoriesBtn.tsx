"use client";

import BackToLink from "@/components/BackToLink";
import { useSearchParams } from "next/navigation";

export default function BackToCategoriesBtn({
  type,
}: {
  type: "expenses" | "incomes";
}) {
  const searchParams = useSearchParams();

  const backBtnSearchParams = new URLSearchParams(searchParams.toString());
  backBtnSearchParams.delete("sortBy");

  return (
    <BackToLink
      href={`/${type}/categories?${backBtnSearchParams.toString()}`}
    />
  );
}
