"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { type ChangePasswordFormValues } from "../types";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { changePasswordSchema } from "../validation";
import {
  startTransition,
  useActionState,
  useEffect,
  useState,
  useId,
} from "react";
import { updatePassword } from "../actions";
import ApiFormErrorAlert from "@/components/ApiFormErrorAlert_v2";
import { FieldGroup } from "@/components/ui/field";
import PasswordInput from "@/components/PasswordInput";
import Section from "../_components/Section";

export default function Form() {
  const methods = useForm<ChangePasswordFormValues>({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    resolver: zodResolver(changePasswordSchema),
  });
  const {
    handleSubmit,
    subscribe,
    trigger,
    formState: { isSubmitted },
  } = methods;

  const [actionErrors, changePasswordAction, isPending] = useActionState(
    updatePassword,
    {},
  );

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

  return (
    <Section
      title="Change Password"
      footer={
        <Button
          type="submit"
          form={id}
          disabled={isPending || (!hideApiError && !!actionErrors.api)}
          className="w-full"
        >
          {isPending && <Spinner data-icon="inline-start" />}
          Change Password
        </Button>
      }
    >
      <FormProvider {...methods}>
        <form
          id={id}
          noValidate
          onSubmit={handleSubmit((data) => {
            startTransition(() => {
              setHideApiError(false);
              changePasswordAction(data);
            });
          })}
        >
          <ApiFormErrorAlert
            hide={hideApiError}
            message={actionErrors.api}
            className="mb-3"
          />
          <FieldGroup>
            <PasswordInput
              name="currentPassword"
              label="Current Password"
              onChange={() => {
                if (isSubmitted) trigger("newPassword");
              }}
            />
            <PasswordInput
              name="newPassword"
              label="New Password"
              onChange={() => {
                if (isSubmitted) trigger("confirmNewPassword");
              }}
            />
            <PasswordInput
              name="confirmNewPassword"
              label="Confirm New Password"
            />
          </FieldGroup>
        </form>
      </FormProvider>
    </Section>
  );
}
