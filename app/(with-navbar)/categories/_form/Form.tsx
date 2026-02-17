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
import { categoryIcons } from './category-icons';
import Icon from './Icon';
import ColorInput from './ColorInput';

export default function Form() {
  const methods = useForm<CategoryFormValues>({
    defaultValues: {
      name: '',
      type: 'expense',
      icon: '/category-icons/other.svg',
      strokeColor: 'rgb(227, 227, 227)',
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
              maxHeight: '232px',
              overflowY: 'auto',
              justifyContent: 'center',
              gap: 3,
              mt: 0.5,
            }}
          >
            {categoryIcons.map(icon => (
              <Icon key={icon.src} icon={icon} />
            ))}
          </Box>
        </Box>
        <Box>
          <Controller
            control={control}
            name="strokeColor"
            render={({ field: { onChange, value } }) => (
              <ColorInput
                label="Stroke color"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </Box>
      </Grid>
    </FormProvider>
  );
}
