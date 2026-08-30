"use client";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import type { SavingsDeposit, SavingsDepositFormValues } from "@/types/savings";
import { fromCents } from "@/utils/currency";
import { zodResolver } from "@hookform/resolvers/zod";
import dayjs from "dayjs";
import {
  startTransition,
  useActionState,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Controller, useForm } from "react-hook-form";
import { savingsDepositSchema } from "../../../../validation";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { normalizeAmountNumberInput } from "@/utils/input";
import SaveIcon from "@mui/icons-material/Save";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { DatePicker } from "@mui/x-date-pickers";
import {
  handleDatePickerChange,
  toDatePickerValue,
} from "@/lib/MuiDatePicker/utils";
import {
  createSavingsDeposit,
  updateSavingsDeposit,
} from "../../../../actions";

interface AddEditDepositDialogProps {
  handleClose: () => void;
  goalId: number;
  currency?: string;
  deposit?: SavingsDeposit;
}

export default function AddEditDepositDialog({
  handleClose,
  goalId,
  currency,
  deposit,
}: AddEditDepositDialogProps) {
  const isEditMode = !!deposit;

  const [createDepositErrors, createDepositAction, isPendingCreate] =
    useActionState(createSavingsDeposit, {});
  const [updateDepositErrors, updateDepositAction, isPendingUpdate] =
    useActionState(updateSavingsDeposit, {});

  const isMutating = isPendingCreate || isPendingUpdate;

  const methods = useForm<SavingsDepositFormValues>({
    defaultValues: getDefaultValues(deposit),
    resolver: zodResolver(savingsDepositSchema),
    disabled: isMutating,
  });
  const {
    control,
    register,
    handleSubmit,
    subscribe,
    formState: { errors },
  } = methods;

  const [hideApiError, setHideApiError] = useState(false);
  const titleId = useId();
  const formId = useId();
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
      const wasM = prevMutatingRef.current;
      prevMutatingRef.current = isMutating;

      const finishedMutating = wasM && !isMutating;
      if (!finishedMutating) return;

      const hasErrors =
        Object.keys(createDepositErrors).length > 0 ||
        Object.keys(updateDepositErrors).length > 0;
      if (!hasErrors) handleClose();
    },
    [isMutating, createDepositErrors, updateDepositErrors, handleClose],
  );

  return (
    <Dialog
      open
      fullWidth
      maxWidth="xs"
      onClose={handleClose}
      aria-labelledby={titleId}
    >
      <DialogTitle
        id={titleId}
        sx={{ pb: 1, fontWeight: 600, fontSize: "1.5rem" }}
      >
        {isEditMode ? "Edit" : "Add"} Deposit
      </DialogTitle>
      <DialogContent>
        <ApiFormErrorAlert
          hide={hideApiError}
          message={createDepositErrors.api || updateDepositErrors.api}
          sx={{ mb: 2 }}
        />
        <Stack
          id={formId}
          spacing={3}
          component="form"
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
          sx={{ mt: 1 }}
        >
          <TextField
            {...register("amount", {
              setValueAs: normalizeAmountNumberInput,
            })}
            label="Amount"
            required
            autoComplete="off"
            spellCheck="false"
            error={!!errors.amount}
            helperText={errors.amount?.message}
            slotProps={{
              htmlInput: {
                inputMode: "decimal",
                onClick: (e: React.MouseEvent<HTMLInputElement>) =>
                  e.currentTarget.select(),
              },
              inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
              input: {
                endAdornment: (
                  <InputAdornment position="end">{currency}</InputAdornment>
                ),
              },
            }}
          />
          <Controller
            control={control}
            name="date"
            render={({
              field: { name, value, onChange, disabled },
              fieldState: { error },
            }) => (
              <DatePicker
                label="Date"
                name={name}
                disabled={disabled}
                value={toDatePickerValue(value)}
                onChange={handleDatePickerChange(onChange)}
                slotProps={{
                  textField: {
                    required: true,
                    error: !!error,
                    helperText: error?.message?.toString(),
                  },
                }}
              />
            )}
          />
          <TextField
            {...register("notes")}
            label="Notes"
            autoComplete="off"
            spellCheck="false"
            error={!!errors.notes}
            helperText={errors.notes?.message}
            multiline
            minRows={2}
            maxRows={10}
            slotProps={{
              inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", gap: 2, px: 3, pb: 2 }}>
        <Button
          type="submit"
          form={formId}
          disabled={
            !hideApiError &&
            (!!createDepositErrors.api || !!updateDepositErrors.api)
          }
          loading={isMutating}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
        <Button
          variant="outlined"
          onClick={handleClose}
          fullWidth
          sx={{ "&.MuiButtonBase-root": { ml: 0 } }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

function getDefaultValues(deposit?: SavingsDeposit): SavingsDepositFormValues {
  if (!deposit) {
    return {
      amount: "",
      date: dayjs().toISOString(),
      notes: "",
    };
  }

  return {
    amount: fromCents(deposit.amount),
    date: dayjs(deposit.date).toISOString(),
    notes: deposit?.notes ?? "",
  };
}
