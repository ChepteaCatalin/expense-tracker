"use client";

import { Controller } from "react-hook-form";
import { Field, FieldLabel, FieldError } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  label: string;
  name: string;
  control?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export default function PasswordInput({
  label,
  name,
  onChange,
  control,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const id = useId();

  const eyeBtnText = showPassword ? "Hide Password" : "Display Password";

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange: fieldOnChange, ...restField },
        fieldState,
      }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={id}>
            {label}
            <span className="text-destructive">*</span>
          </FieldLabel>
          <InputGroup>
            <InputGroupInput
              {...restField}
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                fieldOnChange(e);
                onChange?.(e);
              }}
              aria-invalid={fieldState.invalid}
              id={id}
              required
              autoComplete="new-password"
              spellCheck="false"
            />
            <InputGroupAddon align="inline-end">
              <InputGroupButton
                onClick={() => setShowPassword((show) => !show)}
                aria-label={eyeBtnText}
                title={eyeBtnText}
                size="icon-xs"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
      )}
    />
  );
}
