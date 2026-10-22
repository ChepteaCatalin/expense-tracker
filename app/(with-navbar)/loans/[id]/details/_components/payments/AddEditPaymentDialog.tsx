"use client";

import type {
  LoanPayment,
  LoanPaymentFormValues,
  LoanPaymentInput,
} from "@/types/loans";
import { fromCents, readableCurrency } from "@/utils/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  type ReactElement,
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { loanPaymentSchema } from "../../../../validation";
import { createLoanPayment, updateLoanPayment } from "../../../../actions";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { cn } from "cn";
import AmountInput from "@/components/AmountInput";
import DatePicker from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import ActionErrorAlert from "@/components/ActionErrorAlert";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { calendarDateISO, todayISO } from "@/utils/date";
import { formatISO, parseISO } from "date-fns";

interface AddEditPaymentDialogProps {
  loanId: number;
  currency: string;
  /** In cents: what is left to pay, including the payment being edited */
  maxAmount: number;
  /** `yyyy-MM-dd`: the loan's start date */
  startDay: string;
  payment?: LoanPayment;
  triggerBtn: ReactElement;
}

export default function AddEditPaymentDialog({
  triggerBtn,
  ...formProps
}: AddEditPaymentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={triggerBtn} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {formProps.payment ? "Edit" : "Add"} Payment
          </DialogTitle>
        </DialogHeader>
        <PaymentForm {...formProps} onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function PaymentForm({
  loanId,
  currency,
  maxAmount,
  startDay,
  payment,
  onSuccess,
}: Omit<AddEditPaymentDialogProps, "triggerBtn"> & { onSuccess: () => void }) {
  const isEditMode = !!payment;

  const [createPaymentErrors, createPaymentAction, isPendingCreate] =
    useActionState(createLoanPayment, {});
  const [updatePaymentErrors, updatePaymentAction, isPendingUpdate] =
    useActionState(updateLoanPayment, {});

  const isMutating = isPendingCreate || isPendingUpdate;

  const methods = useForm<LoanPaymentFormValues, unknown, LoanPaymentInput>({
    defaultValues: getDefaultValues(startDay, payment),
    resolver: zodResolver(
      loanPaymentSchema({ maxAmount, minDay: startDay, currency }),
    ),
    disabled: isMutating,
  });
  const { control, handleSubmit, subscribe } = methods;

  const [hideApiError, setHideApiError] = useState(false);

  const formId = useId();
  const amountInputId = useId();
  const notesInputId = useId();
  const prevMutatingRef = useRef(false);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: () => setHideApiError(true),
      }),
    [subscribe],
  );

  useEffect(
    function closeDialogOnSuccess() {
      const wasMutating = prevMutatingRef.current;
      prevMutatingRef.current = isMutating;

      const finishedMutating = wasMutating && !isMutating;
      if (!finishedMutating) return;

      const hasErrors =
        Object.keys(createPaymentErrors).length > 0 ||
        Object.keys(updatePaymentErrors).length > 0;
      if (!hasErrors) onSuccess();
    },
    [isMutating, createPaymentErrors, updatePaymentErrors, onSuccess],
  );

  const maxAmountText = `${readableCurrency(maxAmount)} ${currency}`;

  return (
    <>
      <ActionErrorAlert
        hide={hideApiError}
        message={createPaymentErrors.api || updatePaymentErrors.api}
      />
      <form
        id={formId}
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) {
              updatePaymentAction({ ...data, id: payment.id, loanId });
            } else {
              createPaymentAction({ ...data, loanId });
            }
          });
        })}
      >
        <FieldGroup>
          <Controller
            name="amount"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={amountInputId}
                  className={cn({ "opacity-50": field.disabled })}
                >
                  Amount <span className="text-destructive">*</span>
                </FieldLabel>
                <AmountInput
                  {...field}
                  currency={currency}
                  required
                  id={amountInputId}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={`${amountInputId}-description`}
                />
                <FieldDescription id={`${amountInputId}-description`}>
                  {isEditMode
                    ? `Up to ${maxAmountText}`
                    : `${maxAmountText} left to pay`}
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange, disabled }, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className={cn({ "opacity-50": disabled })}>
                  Date
                </FieldLabel>
                <DatePicker
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                  minDate={startDay}
                  invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="notes"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel
                  htmlFor={notesInputId}
                  className={cn({ "opacity-50": field.disabled })}
                >
                  Notes
                </FieldLabel>
                <Textarea
                  {...field}
                  id={notesInputId}
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
      </form>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button
          type="submit"
          form={formId}
          disabled={
            isMutating ||
            (!hideApiError &&
              (!!createPaymentErrors.api || !!updatePaymentErrors.api))
          }
        >
          {isMutating && <Spinner data-icon="inline-start" />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function getDefaultValues(
  startDay: string,
  payment?: LoanPayment,
): LoanPaymentFormValues {
  if (!payment) {
    const today = todayISO();
    return {
      amount: "",
      // Payments can't predate the loan, so loans starting in the future
      // default to their start date.
      date:
        today.slice(0, 10) < startDay ? formatISO(parseISO(startDay)) : today,
      notes: "",
    };
  }

  return {
    amount: fromCents(payment.amount),
    date: calendarDateISO(payment.date),
    notes: payment.notes ?? "",
  };
}
