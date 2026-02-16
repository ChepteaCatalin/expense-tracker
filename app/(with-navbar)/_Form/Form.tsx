'use client';

import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { CategoryFormValues } from '../categories/types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useId } from 'react';
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../categories/validation';
import Icons from './Icons';

export default function Form() {
  const {
    control,
    register,
    formState: { errors },
  } = useForm<CategoryFormValues>({
    defaultValues: {
      name: '',
      type: 'expense',
      image: '',
      backgroundColor: '',
    },
    resolver: zodResolver(categorySchema),
  });

  const radioGroupId = useId();

  return (
    <Grid container direction="column" spacing={3} component="form" noValidate>
      <TextField
        {...register('name')}
        label="Name"
        fullWidth
        required
        autoComplete="off"
        spellCheck="false"
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, onBlur, value, ref } }) => (
          <FormControl onBlur={onBlur} ref={ref} error={!!errors.type}>
            <FormLabel id={radioGroupId}>Type</FormLabel>
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
              />
              <FormControlLabel
                control={<Radio />}
                label="Income"
                value="income"
              />
            </RadioGroup>
          </FormControl>
        )}
      />
      <Icons />
    </Grid>
  );
}
