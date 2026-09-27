"use client";

import type { SavingsGoal, SavingsGoalFormValues } from "@/types/savings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { savingsGoalSchema } from "../../validation";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useState,
} from "react";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert";
import { createSavingsGoal, updateSavingsGoal } from "../../actions";
import Divider from "@mui/material/Divider";
import { fromCents } from "@/utils/currency";
import type { CurrencyOption } from "@/types/currency";
import dayjs from "dayjs";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AmountInput from "@/components/AmountInput";
import { Textarea } from "@/components/ui/textarea";

interface FormProps {
  goal?: SavingsGoal;
  defaultCurrency?: CurrencyOption;
  currencyAutocomplete: React.ReactNode;
  startDateField: React.ReactNode;
}

export default function GoalForm({
  goal,
  defaultCurrency,
  currencyAutocomplete,
  startDateField,
}: FormProps) {
  const isEditMode = !!goal;

  const [createGoalErrors, createGoalAction, isPendingCreate] = useActionState(
    createSavingsGoal,
    {},
  );
  const [updateGoalErrors, updateGoalAction, isPendingUpdate] = useActionState(
    updateSavingsGoal,
    {},
  );

  const isMutating = isPendingCreate || isPendingUpdate;

  const methods = useForm<SavingsGoalFormValues>({
    defaultValues: getDefaultValues(goal, defaultCurrency),
    resolver: zodResolver(savingsGoalSchema),
    disabled: isMutating,
  });
  const { control, handleSubmit, trigger, subscribe, reset } = methods;

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
    function resetFormOnMount() {
      if (isEditMode) reset(getDefaultValues(goal, defaultCurrency));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createGoalErrors.api || updateGoalErrors.api}
        sx={{ mb: 3 }}
      />
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) updateGoalAction({ ...data, id: goal.id });
            else createGoalAction(data);
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
          {currencyAutocomplete}
          <div className="flex gap-4">
            <Controller
              name="initialAmount"
              control={control}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel htmlFor={`${id}-initial-amount`}>
                    Initial Amount <span className="text-destructive">*</span>
                  </FieldLabel>
                  <AmountInput
                    {...field}
                    onChange={(value) => {
                      onChange(value);
                      trigger("targetAmount");
                    }}
                    required
                    id={`${id}-initial-amount`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="targetAmount"
              control={control}
              render={({ field: { onChange, ...field }, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="flex-1">
                  <FieldLabel htmlFor={`${id}-target-amount`}>
                    Target Amount <span className="text-destructive">*</span>
                  </FieldLabel>
                  <AmountInput
                    {...field}
                    onChange={(value) => {
                      onChange(value);
                      trigger("targetAmount");
                    }}
                    required
                    id={`${id}-target-amount`}
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
          {startDateField}
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-notes`}>Notes</FieldLabel>
                <Textarea
                  {...field}
                  id={`${id}-notes`}
                  aria-invalid={fieldState.invalid}
                  autoComplete="off"
                  spellCheck="false"
                  className="max-h-145"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>

        <Divider />
        <Button
          type="submit"
          disabled={
            !hideApiError && (!!createGoalErrors.api || !!updateGoalErrors.api)
          }
          loading={isMutating}
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

function getDefaultValues(
  goal?: SavingsGoal,
  defaultCurrency?: CurrencyOption,
): SavingsGoalFormValues {
  if (goal) {
    return {
      name: goal.name,
      initialAmount: fromCents(goal.initialAmount),
      targetAmount: fromCents(goal.targetAmount),
      notes: goal.notes || "",
      currency: defaultCurrency!,
      startDate: dayjs(goal.startDate).toISOString(),
    };
  }

  return {
    name: "",
    initialAmount: 0,
    targetAmount: "",
    notes: "",
  } as SavingsGoalFormValues;
}
