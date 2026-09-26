"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";

type AmountValue = number | "";

interface AmountInputProps extends Omit<
  React.ComponentProps<typeof InputGroupInput>,
  "value" | "onChange"
> {
  value: AmountValue;
  onChange: (value: AmountValue) => void;
  currency?: string;
}

export default function AmountInput({
  value,
  onChange,
  currency,
  ...props
}: AmountInputProps) {
  const [text, setText] = useState(() => String(value));
  const displayed = Object.is(normalizeAmountNumberInput(text), value)
    ? text
    : String(value);

  return (
    <InputGroup>
      <InputGroupInput
        {...props}
        type="text"
        inputMode="decimal"
        value={displayed}
        onChange={(e) => {
          const sanitized = sanitizeAmountText(e.target.value);
          setText(sanitized);
          onChange(normalizeAmountNumberInput(sanitized));
        }}
        onClick={(e: React.MouseEvent<HTMLInputElement>) =>
          e.currentTarget.select()
        }
        autoComplete="off"
        spellCheck="false"
      />
      {currency && (
        <InputGroupAddon align="inline-end">
          <InputGroupText>{currency}</InputGroupText>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}

function normalizeAmountNumberInput(value: string): number | "" {
  const normalized = String(value).trim().replace(",", ".");

  if (!normalized) return "";

  return +normalized;
}

/**Keeps digits plus the first "." or ",", dropping everything else*/
function sanitizeAmountText(raw: string): string {
  const cleaned = raw.replace(/[^\d.,]/g, "");
  const separatorIndex = cleaned.search(/[.,]/);

  if (separatorIndex === -1) return cleaned;

  return (
    cleaned.slice(0, separatorIndex + 1) +
    cleaned.slice(separatorIndex + 1).replace(/[.,]/g, "")
  );
}
