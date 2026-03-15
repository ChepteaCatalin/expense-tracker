'use client';

import TextField from '@mui/material/TextField';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { Category, CategoryFormValues, CategoryType } from '@/types/category';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { startTransition, useActionState, useId, useState } from 'react';
import Grid from '@mui/material/Grid';
import { zodResolver } from '@hookform/resolvers/zod';
import { categorySchema } from '../../validation';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { categoryIcons } from '@/utils/category-icons';
import Icon from './Icon';
import ColorInput from './ColorInput';
import Button from '@mui/material/Button';
import { createCategory, updateCategory } from '../../actions';
import Divider from '@mui/material/Divider';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';

export default function Form({
  category,
  type,
}: {
  category?: Category;
  type?: CategoryType;
}) {
  const isEditMode = !!category;

  const methods = useForm<CategoryFormValues>({
    defaultValues: getDefaultValues(category, type),
    resolver: zodResolver(categorySchema),
  });
  const {
    control,
    register,
    subscribe,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [createCategoryErrors, createCategoryAction, isPendingCreate] =
    useActionState(createCategory, {});
  const [updateCategoryErrors, updateCategoryAction, isPendingUpdate] =
    useActionState(updateCategory, {});

  const [hideApiError, setHideApiError] = useState(false);
  subscribe({
    formState: { values: true },
    callback: () => setHideApiError(true),
  });

  const radioGroupId = useId();

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={createCategoryErrors.api || updateCategoryErrors.api}
        sx={{ mb: 3 }}
      />
      <Grid
        container
        direction="column"
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(data => {
          startTransition(() => {
            setHideApiError(false);
            if (isEditMode) updateCategoryAction({ ...category, ...data });
            else createCategoryAction(data);
          });
        })}
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
          slotProps={{
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <Controller
          control={control}
          name="type"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <FormControl
              onBlur={onBlur}
              ref={ref}
              error={!!errors.type}
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
                  disabled={category?.type === 'income'}
                />
                <FormControlLabel
                  control={<Radio />}
                  label="Income"
                  value="income"
                  disabled={category?.type === 'expense'}
                />
              </RadioGroup>
            </FormControl>
          )}
        />
        <Box sx={{ mt: -1.125 }}>
          <Typography color="text.secondary">Icon</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, 54px)',
              maxHeight: '264px',
              overflowY: 'auto',
              justifyContent: 'center',
              gap: 2,
            }}
          >
            {categoryIcons.map(icon => (
              <Icon key={icon.src} icon={icon} />
            ))}
          </Box>
        </Box>
        <Grid container spacing={2}>
          <Controller
            control={control}
            name="backgroundColor"
            render={({ field: { onChange, value } }) => (
              <ColorInput
                label="Background"
                value={value}
                onChange={onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="strokeColor"
            render={({ field: { onChange, value } }) => (
              <ColorInput label="Stroke" value={value} onChange={onChange} />
            )}
          />
        </Grid>
        <Divider />
        <Button
          type="submit"
          disabled={
            !hideApiError &&
            (!!createCategoryErrors.api || !!updateCategoryErrors.api)
          }
          loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          variant="contained"
          fullWidth
        >
          {isEditMode ? 'Edit category' : 'Create category'}
        </Button>
      </Grid>
    </FormProvider>
  );
}

function getDefaultValues(
  category?: Category,
  type?: CategoryType,
): CategoryFormValues {
  if (category)
    return {
      name: category.name,
      type: category.type,
      icon: category.icon,
      strokeColor: category.strokeColor,
      backgroundColor: category.backgroundColor,
    };

  return {
    name: '',
    type: type ?? 'expense',
    icon: '/category-icons/other.svg',
    strokeColor: 'rgb(227, 227, 227)',
    backgroundColor: 'rgb(115, 115, 115)',
  };
}
