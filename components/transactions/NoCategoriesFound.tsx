import Link from "next/link";
import type { CategoryType } from "@/types/category";
import { capitalizeFirstLetter } from "@/utils/string";
import { SearchX, Plus } from "lucide-react";
import { buttonVariants } from "../ui/button";

export default function NoCategoriesFound({ type }: { type: CategoryType }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <SearchX className="text-muted-foreground h-12 w-12" />
      <p className="font-medium">No {type} categories found</p>
      <Link
        href={{ pathname: "/categories/all", query: { type } }}
        className={buttonVariants({ variant: "default" })}
      >
        <Plus data-icon="inline-start" />
        Add {capitalizeFirstLetter(type)} Categories
      </Link>
    </div>
  );
}
