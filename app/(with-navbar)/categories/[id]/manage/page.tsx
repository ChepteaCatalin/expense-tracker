import { getCategoryById } from "@/data/category";
import { validIdParam } from "@/utils/url";
import { notFound, redirect } from "next/navigation";
import Form from "../../_components/form/Form";
import { UnauthorizedError } from "@/utils/error";
import DeleteCategory from "../../_components/DeleteCategory";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { metadata } from "./constants";
import BackToLink from "@/components/BackToLink";
import { Button } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";

export { metadata };

export default async function ManageCategoryPage({
  params,
}: PageProps<"/categories/[id]/manage">) {
  const { id } = await params;

  if (!validIdParam(id)) notFound();

  try {
    var category = await getCategoryById(+id);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    notFound();
  }

  if (!category) notFound();

  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={
        <BackToLink
          href={{
            pathname: "/categories/all",
            query: { type: category.type },
          }}
          pageName="Categories"
        />
      }
    >
      <Form key={category.updatedAt.toISOString()} category={category} />
      {/* TODO: do this */}
      <DeleteCategory
        id={category.id}
        type={category.type}
        name={category.name}
      />
      <Button variant="destructive" className="mt-3 w-full">
        <Trash2Icon data-icon="inline-start" />
        Delete
      </Button>
    </TitledCardPageWrapper>
  );
}
