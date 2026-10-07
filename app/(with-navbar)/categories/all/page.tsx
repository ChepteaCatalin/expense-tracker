import { getAllCategoriesByType } from "@/data/category";
import { UnauthorizedError } from "@/utils/error";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { categoryIcons } from "@/utils/category-icons";
import { isValidCategoryType } from "../utils";
import TypeToggle from "../_components/TypeToggle";
import TitledCardPageWrapper from "@/components/TitledCardPageWrapper";
import { NoCategories } from "../_components/NoCategories";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { Plus } from "lucide-react";

export const metadata = {
  title: "Categories",
  description: "Manage your expense and income categories",
};

export default async function CategoriesPage({
  searchParams,
}: {
  searchParams: Promise<{ type: string }>;
}) {
  const { type } = await searchParams;

  if (!isValidCategoryType(type)) notFound();

  try {
    var categories = await getAllCategoriesByType(type);
  } catch (err) {
    if (err instanceof UnauthorizedError) redirect("/signin");
    notFound();
  }

  return (
    <TitledCardPageWrapper
      title={metadata.title}
      subtitle={metadata.description}
      aboveCard={<TypeToggle />}
      footer={<CardFooter type={type} />}
    >
      {categories.length ? (
        <ul className="-m-1 grid max-h-114.5 grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] content-start gap-x-1 gap-y-3 overflow-y-auto overscroll-contain p-1">
          {categories.map((category) => {
            const Icon = categoryIcons.find(
              (icon) => category.icon === icon.src,
            )!.Component;

            return (
              <li key={category.id}>
                <Link
                  href={`/categories/${category.id}/manage`}
                  title={category.name}
                  className="group hover:bg-accent focus-visible:ring-ring/60 flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors outline-none focus-visible:ring-2"
                >
                  <Icon
                    aria-hidden
                    className="box-content block size-10 shrink-0 rounded-full p-0.75 transition-transform duration-200 ease-out group-hover:scale-105"
                    style={{
                      backgroundColor: category.backgroundColor,
                      fill: category.strokeColor,
                    }}
                  />
                  <span className="w-full truncate text-center text-sm font-medium">
                    {category.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <NoCategories type={type} />
      )}
    </TitledCardPageWrapper>
  );
}

function CardFooter({ type }: { type: string }) {
  return (
    <Link
      href={{ pathname: "/categories/new", query: { type } }}
      className={cn(buttonVariants({ variant: "default" }), "w-full")}
    >
      <Plus data-icon="inline-start" />
      New Category
    </Link>
  );
}
