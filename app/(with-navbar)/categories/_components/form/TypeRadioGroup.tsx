'use client';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { notFound, useSearchParams } from 'next/navigation';
import { useEffect, useId } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { isValidCategoryType } from '../../utils';
import { CategoryType } from '@/types/category';

export default function TypeRadioGroup({
  isEditMode,
  editingCategoryType,
  error,
}: {
  isEditMode: boolean;
  editingCategoryType?: CategoryType;
  error: boolean;
}) {
  const searchParams = useSearchParams();
  const urlCategoryType = searchParams.get('type');
  const { setValue } = useFormContext();

  const radioGroupId = useId();

  useEffect(() => {
    if (!isEditMode) {
      setValue('type', urlCategoryType);
    }
  }, [isEditMode, setValue, urlCategoryType]);

  if (!isEditMode && !isValidCategoryType(urlCategoryType)) notFound();

  return (
    <Controller
      name="type"
      {...(!isEditMode && { defaultValue: urlCategoryType })}
      render={({ field: { onChange, onBlur, value, ref, disabled } }) => (
        <FormControl
          onBlur={onBlur}
          ref={ref}
          error={!!error}
          disabled={isEditMode}
        >
          <FormLabel
            id={radioGroupId}
            sx={{ '&.Mui-disabled': { color: 'text.secondary' } }}
          >
            Type
          </FormLabel>
          <RadioGroup
            name="type"
            value={value}
            onChange={(_, value) => onChange(value)}
            row
            aria-labelledby={radioGroupId}
          >
            <FormControlLabel
              control={<Radio />}
              label="Expense"
              value="expense"
              disabled={disabled || editingCategoryType === 'income'}
            />
            <FormControlLabel
              control={<Radio />}
              label="Income"
              value="income"
              disabled={disabled || editingCategoryType === 'expense'}
            />
          </RadioGroup>
        </FormControl>
      )}
    />
  );
}
