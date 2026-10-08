"use client";

import type {
  SavingsGoal,
  SavingsGoalFormValues,
  SavingsGoalInput,
} from "@/types/savings";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  type DefaultValues,
} from "react-hook-form";
import { savingsGoalSchema } from "../../validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useState,
} from "react";
import { createSavingsGoal, updateSavingsGoal } from "../../actions";
import { fromCents } from "@/utils/currency";
import type { CurrencyOption } from "@/types/currency";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import AmountInput from "@/components/AmountInput";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import ActionErrorAlert from "@/components/ActionErrorAlert";
import { cn } from "cn";
import { calendarDateISO } from "@/utils/date";

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

  const methods = useForm<SavingsGoalFormValues, unknown, SavingsGoalInput>({
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
      <ActionErrorAlert
        hide={hideApiError}
        message={createGoalErrors.api || updateGoalErrors.api}
        className="mb-6"
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
                  <FieldLabel
                    htmlFor={`${id}-initial-amount`}
                    className={cn({ "opacity-50": field.disabled })}
                  >
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
                  <FieldLabel
                    htmlFor={`${id}-target-amount`}
                    className={cn({ "opacity-50": field.disabled })}
                  >
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
                <FieldLabel
                  htmlFor={`${id}-notes`}
                  className={cn({ "opacity-50": field.disabled })}
                >
                  Notes
                </FieldLabel>
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
        <Separator className="my-5" />
        <Button
          type="submit"
          disabled={
            isMutating ||
            (!hideApiError &&
              (!!createGoalErrors.api || !!updateGoalErrors.api))
          }
          className="w-full"
        >
          {isMutating ? (
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

function getDefaultValues(
  goal?: SavingsGoal,
  defaultCurrency?: CurrencyOption,
): DefaultValues<SavingsGoalFormValues> {
  if (goal) {
    return {
      name: goal.name,
      initialAmount: fromCents(goal.initialAmount),
      targetAmount: fromCents(goal.targetAmount),
      notes: goal.notes || "",
      currency: defaultCurrency,
      startDate: calendarDateISO(goal.startDate),
    };
  }

  return {
    name: "",
    initialAmount: 0,
    targetAmount: "",
    notes: "",
  };
}
