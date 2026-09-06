"use client";

import PasswordInput from "@/components/PasswordInput";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "../validation";
import { signUp } from "../actions";
import GoogleAuthButton from "../_components/GoogleAuthButton";
import { startTransition, useActionState, useEffect, useState } from "react";
import { type SignUpFormValues } from "../types";
import { Spinner } from "@/components/ui/spinner";
import { Button } from "@/components/ui/button";
import ActionErrorAlert from "@/components/ActionErrorAlert";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

export default function SignUpForm() {
  const {
    control,
    trigger,
    handleSubmit,
    subscribe,
    formState: { isSubmitted },
  } = useForm<SignUpFormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(signUpSchema),
  });

  const [actionErrors, signUpAction, isPending] = useActionState(signUp, {});

  const [hideApiError, setHideApiError] = useState(false);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: () => setHideApiError(true),
      }),
    [subscribe],
  );

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        startTransition(() => {
          setHideApiError(false);
          signUpAction(data);
        });
      })}
    >
      <ActionErrorAlert
        hide={hideApiError}
        message={actionErrors.api}
        className="mb-3"
      />
      <FieldGroup>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Name<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                required
                aria-invalid={fieldState.invalid}
                autoComplete="name"
                spellCheck="false"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>
                Email<span className="text-destructive">*</span>
              </FieldLabel>
              <Input
                {...field}
                id={field.name}
                required
                aria-invalid={fieldState.invalid}
                autoComplete="email"
                spellCheck="false"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <PasswordInput
          control={control}
          name="password"
          label="Password"
          onChange={() => {
            if (isSubmitted) trigger("confirmPassword");
          }}
        />
        <PasswordInput
          control={control}
          name="confirmPassword"
          label="Confirm Password"
          onChange={() => {
            if (isSubmitted) trigger("confirmPassword");
          }}
        />
      </FieldGroup>
      <Separator className="my-5" />
      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isPending || (!hideApiError && !!actionErrors.api)}
          className="w-full"
        >
          {isPending ? (
            <>
              <Spinner data-icon="inline-start" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </Button>
        <GoogleAuthButton />
      </div>
    </form>
  );
}
