'use client';

import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

interface PasswordInputProps {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  name?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  error?: boolean;
  helperText?: string;
}

export default function PasswordInput({
  label,
  name,
  ref,
  onChange,
  onBlur,
  error,
  helperText,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <TextField
      type={showPassword ? 'text' : 'password'}
      label={label}
      fullWidth
      required
      autoComplete="new-password"
      spellCheck="false"
      name={name}
      ref={ref}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label={
                  showPassword ? 'hide the password' : 'display the password'
                }
                onClick={() => setShowPassword(show => !show)}
                onMouseDown={preserveFocus}
                onMouseUp={preserveFocus}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOff fontSize="small" />
                ) : (
                  <Visibility fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}

function preserveFocus(event: React.MouseEvent<HTMLButtonElement>) {
  event.preventDefault();
}
