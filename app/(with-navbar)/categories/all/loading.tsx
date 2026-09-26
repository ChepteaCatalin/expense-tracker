import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "Categories",
  description: "Manage your expense and income categories",
};

export default function CategoriesLoading() {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<Skeleton className="mb-2 h-11.5 w-full rounded-xl" />}
      footer={<Skeleton className="h-8 w-full rounded-lg" />}
    >
      <Skeleton className="aspect-video w-full" />
    </TitledCardPageWrapper>
  );
}
