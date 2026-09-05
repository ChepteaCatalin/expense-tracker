"use client";

import { Controller, FormProvider, useForm } from "react-hook-form";
import { type Category, type CategoryFormValues } from "@/types/category";
import {
  startTransition,
  Suspense,
  useActionState,
  useEffect,
  useId,
  useState,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../validation";
import { categoryIcons } from "@/utils/category-icons";
import Icon from "./Icon";
import ColorInput from "./ColorInput";
import { createCategory, updateCategory } from "../../actions";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert_v2";
import TypeRadioGroup from "./TypeRadioGroup";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export default function Form({ category }: { category?: Category }) {
  const isEditMode = !!category;

  const [createCategoryErrors, createCategoryAction, isPendingCreate] =
    useActionState(createCategory, {});
  const [updateCategoryErrors, updateCategoryAction, isPendingUpdate] =
    useActionState(updateCategory, {});

  const disabledForm = isPendingCreate || isPendingUpdate;

  const methods = useForm<CategoryFormValues>({
    shouldUnregister: true,
    defaultValues: getDefaultValues(category),
    resolver: zodResolver(categorySchema),
    disabled: disabledForm,
  });
  const { control, reset, subscribe, handleSubmit } = methods;

  const [hideApiError, setHideApiError] = useState(false);

  const id = useId();

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: () => setHideApiError(true),
      }),
    [subscribe],
  );

  useEffect(
    function resetFormOnUnmount() {
      return reset;
    },
    [reset],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createCategoryErrors.api || updateCategoryErrors.api}
        className="mb-4"
      />
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) updateCategoryAction({ ...category, ...data });
            else createCategoryAction(data);
          });
        })}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                data-disabled={field.disabled}
              >
                <FieldLabel htmlFor={`${id}-name`}>
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  required
                  disabled={field.disabled}
                  id={`${id}-name`}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  spellCheck="false"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Suspense fallback={<TypeRadioGroupSkeleton />}>
            <TypeRadioGroup
              isEditMode={isEditMode}
              editingCategoryType={category?.type}
            />
          </Suspense>
          <Controller
            name="icon"
            control={control}
            render={({ field }) => (
              <FieldSet>
                <FieldLegend
                  variant="label"
                  className={`${field.disabled ? "opacity-50" : ""}`}
                >
                  Icon
                </FieldLegend>
                <RadioGroup
                  name={field.name}
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={field.disabled}
                  aria-label="Icon"
                  className="border-input dark:bg-input/30 aria-invalid:border-destructive max-h-66 grid-cols-[repeat(auto-fill,minmax(3.25rem,1fr))] content-start gap-1 overflow-y-auto overscroll-contain rounded-lg border p-1.5"
                >
                  {categoryIcons.map((icon) => (
                    <Icon key={icon.src} icon={icon} />
                  ))}
                </RadioGroup>
              </FieldSet>
            )}
          />
          <div className="space-x-3">
            <Controller
              control={control}
              name="backgroundColor"
              render={({ field: { onChange, value, disabled } }) => (
                <ColorInput
                  label="Background"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
            <Controller
              control={control}
              name="strokeColor"
              render={({ field: { onChange, value, disabled } }) => (
                <ColorInput
                  label="Stroke"
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                />
              )}
            />
          </div>
        </FieldGroup>
        <Separator className="my-3" />
        <Button
          type="submit"
          disabled={
            disabledForm ||
            (!hideApiError &&
              (!!createCategoryErrors.api || !!updateCategoryErrors.api))
          }
          className="w-full"
        >
          {disabledForm ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          Save
        </Button>
      </form>
    </FormProvider>
  );
}

function getDefaultValues(category?: Category): CategoryFormValues {
  if (category)
    return {
      name: category.name,
      type: category.type,
      icon: category.icon,
      strokeColor: category.strokeColor,
      backgroundColor: category.backgroundColor,
    };

  return {
    name: "",
    icon: "/category-icons/other.svg",
    strokeColor: "rgb(52, 211, 153)",
    backgroundColor: "rgb(6, 95, 70)",
  } as CategoryFormValues;
}

function TypeRadioGroupSkeleton() {
  return (
    <div>
      <Skeleton className="mb-1.5 h-5 w-8" />
      <Skeleton className="mb-2 h-5 w-20" />
      <Skeleton className="h-5 w-18" />
    </div>
  );
}
