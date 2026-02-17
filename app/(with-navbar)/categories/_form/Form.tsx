'use client';

import TextField from '@mui/material/TextField';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { CategoryFormValues } from '../types';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { useId } from 'react';
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../validation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { iconsList } from './icons-list';
import Icon from './Icon';

export default function Form() {
  const methods = useForm<CategoryFormValues>({
    defaultValues: {
      name: '',
      type: 'expense',
      image: '',
      backgroundColor: '',
    },
    resolver: zodResolver(categorySchema),
  });
  const {
    control,
    register,
    formState: { errors },
  } = methods;

  const radioGroupId = useId();

  return (
    <FormProvider {...methods}>
      <Grid
        container
        direction="column"
        spacing={3}
        component="form"
        noValidate
      >
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
        <Box>
          <Typography color="text.secondary">Icon</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, 40px)',
              maxHeight: '40vh',
              overflowY: 'auto',
              justifyContent: 'center',
              gap: 3,
              mt: 0.5,
            }}
          >
            {iconsList.map(icon => (
              <Icon key={icon.src} icon={icon} />
            ))}
          </Box>
        </Box>
      </Grid>
    </FormProvider>
  );
}
