"use client";

import type { SortTransactionBy } from "@/types/transaction";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Spinner } from "../ui/spinner";

const items = [
  { value: "date", label: "Date" },
  { value: "amount", label: "Amount" },
];

export default function SortBy() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isNavigating, startNavigation] = useTransition();

  const searchByValue = searchParams.get("sortBy");

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium">Sort By:</span>
      <Select
        items={items}
        value={searchByValue || ("date" satisfies SortTransactionBy)}
        onValueChange={(value) => {
          if (value === searchByValue) return;

          const params = new URLSearchParams(searchParams.toString());
          params.set("sortBy", value!);

          startNavigation(() => {
            router.push(`${pathname}?${params.toString()}`);
          });
        }}
        disabled={isNavigating}
      >
        <SelectTrigger>
          {isNavigating && <Spinner />}
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
