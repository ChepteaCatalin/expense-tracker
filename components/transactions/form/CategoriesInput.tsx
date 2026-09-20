import { categoryIcons } from "@/utils/category-icons";
import type { Category } from "@/types/category";
import { Controller, useFormState } from "react-hook-form";
import { useEffect, useRef } from "react";
import { cn } from "cn";

export default function CategoriesInput({
  categories,
  disabled,
}: {
  categories: Category[];
  disabled: boolean;
}) {
  const { errors } = useFormState();

  const selectedRef = useRef<HTMLLIElement | null>(null);

  useEffect(function scrollSelectedIntoView() {
    selectedRef.current?.scrollIntoView({
      behavior: "instant",
      block: "nearest",
    });
  }, []);

  return (
    <div>
      <div className="mb-2">
        <p className="font-medium">
          Category <span className="text-destructive">*</span>
        </p>
        {errors.categoryId && (
          <p className="text-destructive">
            {String(errors.categoryId.message)}
          </p>
        )}
      </div>
      <Controller
        name="categoryId"
        render={({ field: { onChange, value } }) => (
          <ul className="-m-1 grid max-h-114.5 grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] content-start gap-x-1 gap-y-3 overflow-y-auto overscroll-contain p-1">
            {categories.map((category) => {
              const Icon = categoryIcons.find(
                (icon) => category.icon === icon.src,
              )!.Component;

              const isSelected = category.id == value;

              return (
                <li
                  ref={isSelected ? selectedRef : null}
                  key={category.id}
                  onClick={(e) => {
                    if (!disabled) {
                      onChange(category.id);
                      e.currentTarget?.scrollIntoView({
                        behavior: "instant",
                        block: "nearest",
                      });
                    }
                  }}
                  className="group hover:bg-accent focus-visible:ring-ring/60 flex flex-col items-center gap-1.5 rounded-lg p-2 transition-colors outline-none focus-visible:ring-2"
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    ...(isSelected && {
                      backgroundColor: category.backgroundColor,
                    }),
                  }}
                >
                  <Icon
                    aria-hidden
                    className={cn(
                      "box-content block size-10 shrink-0 rounded-full p-0.75 transition-transform duration-200 ease-out",
                      !isSelected && "group-hover:scale-105",
                    )}
                    style={{
                      backgroundColor: category.backgroundColor,
                      fill: category.strokeColor,
                    }}
                  />
                  <span
                    title={category.name}
                    className="w-full truncate text-center text-sm font-medium"
                    style={{
                      ...(isSelected && {
                        color: getContrastText(category.backgroundColor),
                      }),
                    }}
                  >
                    {category.name}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      />
    </div>
  );
}

function getContrastText(rgb: string) {
  const match = rgb.match(/\d+(?:\.\d+)?/g);

  if (!match || match.length < 3) return "#000";

  const [r, g, b] = match.map(Number);

  const luminance = [r, g, b]
    .map((channel) => {
      const value = channel / 255;
      return value <= 0.03928
        ? value / 12.92
        : Math.pow((value + 0.055) / 1.055, 2.4);
    })
    .reduce((sum, value, i) => {
      return sum + value * [0.2126, 0.7152, 0.0722][i];
    }, 0);

  return luminance > 0.179 ? "#000" : "#fff";
}
