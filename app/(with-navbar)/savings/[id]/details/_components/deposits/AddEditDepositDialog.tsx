"use client";

import type {
  SavingsDeposit,
  SavingsDepositFormValues,
  SavingsDepositInput,
} from "@/types/savings";
import { fromCents } from "@/utils/currency";
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
import { savingsDepositSchema } from "../../../../validation";
import {
  createSavingsDeposit,
  updateSavingsDeposit,
} from "../../../../actions";
import {
  Field,
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

interface AddEditDepositDialogProps {
  goalId: number;
  triggerBtn: ReactElement;
  currency?: string;
  deposit?: SavingsDeposit;
}

export default function AddEditDepositDialog({
  goalId,
  currency,
  deposit,
  triggerBtn,
}: AddEditDepositDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={triggerBtn} />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{deposit ? "Edit" : "Add"} Deposit</DialogTitle>
        </DialogHeader>
        <DepositForm
          goalId={goalId}
          currency={currency}
          deposit={deposit}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function DepositForm({
  goalId,
  currency,
  deposit,
  onSuccess,
}: Omit<AddEditDepositDialogProps, "triggerBtn"> & { onSuccess: () => void }) {
  const isEditMode = !!deposit;

  const [createDepositErrors, createDepositAction, isPendingCreate] =
    useActionState(createSavingsDeposit, {});
  const [updateDepositErrors, updateDepositAction, isPendingUpdate] =
    useActionState(updateSavingsDeposit, {});

  const isMutating = isPendingCreate || isPendingUpdate;

  const methods = useForm<
    SavingsDepositFormValues,
    unknown,
    SavingsDepositInput
  >({
    defaultValues: getDefaultValues(deposit),
    resolver: zodResolver(savingsDepositSchema),
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
        Object.keys(createDepositErrors).length > 0 ||
        Object.keys(updateDepositErrors).length > 0;
      if (!hasErrors) onSuccess();
    },
    [isMutating, createDepositErrors, updateDepositErrors, onSuccess],
  );

  return (
    <>
      <ActionErrorAlert
        hide={hideApiError}
        message={createDepositErrors.api || updateDepositErrors.api}
      />
      <form
        id={formId}
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) {
              updateDepositAction({ ...data, id: deposit.id, goalId });
            } else {
              createDepositAction({ ...data, goalId });
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
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="date"
            control={control}
            render={({ field: { value, onChange, disabled } }) => (
              <Field>
                <FieldLabel className={cn({ "opacity-50": disabled })}>
                  Date
                </FieldLabel>
                <DatePicker
                  value={value}
                  onChange={onChange}
                  disabled={disabled}
                />
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
              (!!createDepositErrors.api || !!updateDepositErrors.api))
          }
        >
          {isMutating && <Spinner data-icon="inline-start" />}
          Save
        </Button>
      </DialogFooter>
    </>
  );
}

function getDefaultValues(deposit?: SavingsDeposit): SavingsDepositFormValues {
  if (!deposit) {
    return {
      amount: "",
      date: new Date().toISOString(),
      notes: "",
    };
  }

  return {
    amount: fromCents(deposit.amount),
    date: deposit.date.toISOString(),
    notes: deposit?.notes ?? "",
  };
}
