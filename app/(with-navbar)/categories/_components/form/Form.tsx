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
import Grid from "@mui/material/Grid";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../../validation";
import { categoryIcons } from "@/utils/category-icons";
import Icon from "./Icon";
import ColorInput from "./ColorInput";
import Button from "@mui/material/Button";
import { createCategory, updateCategory } from "../../actions";
import Divider from "@mui/material/Divider";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert";
import SaveIcon from "@mui/icons-material/Save";
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
        sx={{ mb: 3 }}
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-name`}>
                  Name <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  required
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
                <FieldLegend variant="label">Icon</FieldLegend>
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
          <Grid container spacing={2}>
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
          </Grid>
        </FieldGroup>
        <Divider />
        <Button
          type="submit"
          disabled={
            !hideApiError &&
            (!!createCategoryErrors.api || !!updateCategoryErrors.api)
          }
          loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
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
