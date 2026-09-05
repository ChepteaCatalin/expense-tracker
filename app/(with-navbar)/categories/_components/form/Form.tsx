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
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
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
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
          <Box sx={{ mt: -1.125 }}>
            <Typography sx={{ color: "text.secondary" }}>Icon</Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, 54px)",
                maxHeight: "264px",
                overflowY: "auto",
                justifyContent: "center",
                gap: 2,
              }}
            >
              {categoryIcons.map((icon) => (
                <Icon key={icon.src} icon={icon} disabled={disabledForm} />
              ))}
            </Box>
          </Box>
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
    strokeColor: "rgb(30, 215, 96)",
    backgroundColor: "rgba(30, 215, 96, 0.12)",
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
