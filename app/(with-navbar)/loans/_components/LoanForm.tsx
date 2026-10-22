"use client";

import type { Loan, LoanFormValues, LoanInput } from "@/types/loans";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Controller,
  FormProvider,
  useForm,
  type DefaultValues,
} from "react-hook-form";
import { loanSchema } from "../validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useState,
} from "react";
import { createLoan, updateLoan } from "../actions";
import { fromCents } from "@/utils/currency";
import type { CurrencyOption } from "@/types/currency";
import {
  Field,
  FieldDescription,
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
import { calendarDateISO, calendarDay } from "@/utils/date";

interface FormProps {
  loan?: Loan;
  defaultCurrency?: CurrencyOption;
  currencyAutocomplete: React.ReactNode;
  startDateField: React.ReactNode;
}

export default function LoanForm({
  loan,
  defaultCurrency,
  currencyAutocomplete,
  startDateField,
}: FormProps) {
  const isEditMode = !!loan;

  const [createLoanErrors, createLoanAction, isPendingCreate] = useActionState(
    createLoan,
    {},
  );
  const [updateLoanErrors, updateLoanAction, isPendingUpdate] = useActionState(
    updateLoan,
    {},
  );

  const isMutating = isPendingCreate || isPendingUpdate;

  const methods = useForm<LoanFormValues, unknown, LoanInput>({
    defaultValues: getDefaultValues(loan, defaultCurrency),
    resolver: zodResolver(
      loanSchema(
        loan && {
          paidAmount: loan.paidAmount,
          firstPaymentDay:
            loan.firstPaymentDate && calendarDay(loan.firstPaymentDate),
          currency: loan.currency,
        },
      ),
    ),
    disabled: isMutating,
  });
  const { control, handleSubmit, subscribe, reset } = methods;

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
      if (isEditMode) reset(getDefaultValues(loan, defaultCurrency));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <FormProvider {...methods}>
      <ActionErrorAlert
        hide={hideApiError}
        message={createLoanErrors.api || updateLoanErrors.api}
        className="mb-6"
      />
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) updateLoanAction({ ...data, id: loan.id });
            else createLoanAction(data);
          });
        })}
      >
        <FieldGroup>
          <Controller
            name="lender"
            control={control}
            render={({ field, fieldState }) => (
              <Field
                data-invalid={fieldState.invalid}
                data-disabled={field.disabled}
              >
                <FieldLabel htmlFor={`${id}-lender`}>
                  Lender <span className="text-destructive">*</span>
                </FieldLabel>
                <Input
                  {...field}
                  required
                  disabled={field.disabled}
                  id={`${id}-lender`}
                  aria-invalid={fieldState.invalid}
                  placeholder="Who do you owe?"
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
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={`${id}-amount`}
                  className={cn({ "opacity-50": field.disabled })}
                >
                  Amount <span className="text-destructive">*</span>
                </FieldLabel>
                <AmountInput
                  {...field}
                  required
                  id={`${id}-amount`}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={`${id}-amount-description`}
                />
                <FieldDescription id={`${id}-amount-description`}>
                  The total you have to pay back, including any interest
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
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
              (!!createLoanErrors.api || !!updateLoanErrors.api))
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
  loan?: Loan,
  defaultCurrency?: CurrencyOption,
): DefaultValues<LoanFormValues> {
  if (loan) {
    return {
      lender: loan.lender,
      amount: fromCents(loan.amount),
      notes: loan.notes || "",
      currency: defaultCurrency,
      startDate: calendarDateISO(loan.startDate),
    };
  }

  return {
    lender: "",
    amount: "",
    notes: "",
  };
}
