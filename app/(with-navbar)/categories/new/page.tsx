import BackToLink from "@/components/BackToLink";
import Form from "../_components/form/Form";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata = {
  title: "New Category",
  description: "Create a new expense or income category",
};

export default async function NewCategoryPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <Suspense fallback={<Skeleton className="mb-1 h-8 w-42" />}>
          <BackToCategoriesLink searchParams={searchParams} />
        </Suspense>
      }
    >
      <Form />
    </TitledCardPageWrapper>
  );
}

async function BackToCategoriesLink({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;

  return (
    <BackToLink
      href={{ pathname: "/categories/all", query: { type } }}
      pageName="Categories"
    />
  );
}
