import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function TransactionCategoriesListLoading() {
  return (
    <div>
      <Card>
        <CardContent>
          <Skeleton className="h-67.5 lg:h-80" />
        </CardContent>
      </Card>
      <div className="mt-4 flex flex-col gap-2.5">
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
        <CategoryListItem />
      </div>
    </div>
  );
}

function CategoryListItem() {
  return (
    <Card className="[--card-spacing:--spacing(2)]">
      <CardContent>
        <Skeleton className="h-9" />
      </CardContent>
    </Card>
  );
}
