import { SearchX } from "lucide-react";
import type { CategoryType } from "@/types/category";
import { capitalizeFirstLetter } from "@/utils/string";

export function NoCategories({ type }: { type: CategoryType }) {
  return (
    <div className="mx-auto max-w-sm space-y-2 text-center">
      <SearchX className="text-muted-foreground mx-auto h-12 w-12" />
      <h2 className="text-lg font-semibold">
        No {capitalizeFirstLetter(type)} Categories Found
      </h2>
      <p className="text-muted-foreground text-sm">
        You haven&apos;t created any {type} categories yet. Get started by
        creating your first {type} category.
      </p>
    </div>
  );
}
