"use client";

import { useForm } from "react-hook-form";
import { signInSchema } from "../validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import { signIn } from "../actions";
import GoogleAuthButton from "../_components/GoogleAuthButton";
import PasswordInput from "@/components/PasswordInput";
import { startTransition, useActionState, useEffect, useState } from "react";
import { type SignInFormValues } from "../types";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import ActionErrorAlert from "@/components/ActionErrorAlert";

export default function SignInForm() {
  const { control, handleSubmit, subscribe } = useForm<SignInFormValues>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(signInSchema),
  });

  const [actionErrors, signInAction, isPending] = useActionState(signIn, {});

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
          signInAction(data);
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
        <PasswordInput control={control} name="password" label="Password" />
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
              Logging In...
            </>
          ) : (
            "Log In"
          )}
        </Button>
        <GoogleAuthButton />
      </div>
    </form>
  );
}
