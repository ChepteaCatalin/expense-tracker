"use client";

import type { Transaction } from "@/types/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { transactionSchema } from "@/utils/validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useState,
} from "react";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert";
import { Separator } from "@/components/ui/separator";
import type { Category } from "@/types/category";
import CategoriesInput from "./CategoriesInput";
import Link from "next/link";
import dayjs from "dayjs";
import { fromCents } from "@/utils/currency";
import DeleteTransaction from "./DeleteTransaction";
import { useSearchParams } from "next/navigation";
import type {
  CreateTransactionAction,
  DeleteTransactionAction,
  TransactionFormErrors,
  TransactionFormValues,
  TransactionFormValuesWithId,
  TransactionType,
  UpdateTransactionAction,
} from "@/types/transaction";
import { capitalizeFirstLetter } from "@/utils/string";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import AmountInput from "@/components/AmountInput";
import DatePicker from "@/components/DatePicker";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "cn";
import { Save } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

interface FormProps {
  type: TransactionType;
  currency?: string;
  categories: Category[];
  transaction?: Transaction;
  createAction?: CreateTransactionAction;
  updateAction?: UpdateTransactionAction;
  deleteAction?: DeleteTransactionAction;
}

export default function Form({
  type,
  currency,
  categories,
  transaction,
  createAction,
  updateAction,
  deleteAction,
}: FormProps) {
  const searchParams = useSearchParams();

  const isEditMode = !!transaction;

  const [createTransactionErrors, createTransactionAction, isPendingCreate] =
    useActionState(
      createAction?.bind(null, searchParams.toString()) ??
        noopTransactionAction,
      {},
    );
  const [updateTransactionErrors, updateTransactionAction, isPendingUpdate] =
    useActionState(
      updateAction?.bind(null, searchParams.toString()) ??
        noopTransactionAction,
      {},
    );

  const disabledForm = isPendingCreate || isPendingUpdate;

  const methods = useForm<TransactionFormValues>({
    defaultValues: getDefaultValues(transaction),
    resolver: zodResolver(transactionSchema),
    disabled: disabledForm,
  });
  const { control, subscribe, handleSubmit, reset } = methods;

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
      reset(getDefaultValues(transaction));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createTransactionErrors.api || updateTransactionErrors.api}
        sx={{ mb: 3 }}
      />
      <form
        noValidate
        onSubmit={handleSubmit((data) => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode)
              updateTransactionAction({ ...data, id: transaction.id });
            else createTransactionAction(data);
          });
        })}
      >
        <FieldGroup>
          <div className="flex gap-4">
            <Controller
              name="amount"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={`${id}-amount`}>
                    Amount <span className="text-destructive">*</span>
                  </FieldLabel>
                  <AmountInput
                    {...field}
                    currency={currency}
                    required
                    id={`${id}-amount`}
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
                  <FieldLabel>Date</FieldLabel>
                  <DatePicker
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                  />
                </Field>
              )}
            />
          </div>
          <CategoriesInput categories={categories} disabled={disabledForm} />
          <Controller
            name="description"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-description`}>
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id={`${id}-description`}
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
        <Link
          href={{
            pathname: "/categories/all",
            query: { type },
          }}
          className={cn(
            buttonVariants({ variant: "secondary" }),
            "mb-3 w-full",
          )}
        >
          Manage {capitalizeFirstLetter(type)} Categories
        </Link>
        <Button
          type="submit"
          disabled={
            disabledForm ||
            (!hideApiError &&
              (!!createTransactionErrors.api || !!updateTransactionErrors.api))
          }
          className="mb-3 w-full"
        >
          {disabledForm ? (
            <Spinner data-icon="inline-start" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          Save
        </Button>
        {isEditMode && (
          <DeleteTransaction
            id={transaction.id}
            type={type}
            action={deleteAction!}
          />
        )}
      </form>
    </FormProvider>
  );
}

function getDefaultValues(transaction?: Transaction): TransactionFormValues {
  if (transaction) {
    return {
      amount: fromCents(transaction.amount),
      categoryId: transaction.categoryId,
      date: dayjs(transaction.date).toISOString(),
      description: transaction.description,
    };
  }

  return {
    amount: "",
    categoryId: "",
    date: dayjs().toISOString(),
    description: "",
  };
}

async function noopTransactionAction(
  state: TransactionFormErrors,
  payload: TransactionFormValues | TransactionFormValuesWithId,
): Promise<TransactionFormErrors> {
  void state;
  void payload;
  return {};
}
