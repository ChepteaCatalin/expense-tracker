'use client';

import { ExpenseFormValues } from '@/types/expense';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { expenseSchema } from '../validation';
import { startTransition, useEffect, useState } from 'react';
import ApiFormErrorAlert from '@/components/ApiFormErrorAlert';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { Category } from '@/types/category';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { categoryIcons } from '@/utils/category-icons';

export default function Form({ categories }: { categories: Category[] }) {
  //TODO:
  const disabledForm = false;
  const isEditMode = false;

  const methods = useForm<ExpenseFormValues>({
    shouldUnregister: true,
    defaultValues: getDefaultValues(),
    resolver: zodResolver(expenseSchema),
    disabled: disabledForm,
  });
  const {
    register,
    reset,
    subscribe,
    handleSubmit,
    formState: { errors },
  } = methods;

  const [hideApiError, setHideApiError] = useState(false);

  useEffect(
    () =>
      subscribe({
        formState: { values: true },
        callback: () => setHideApiError(true),
      }),
    [subscribe],
  );

  useEffect(
    function resetFormOnUnmount() {
      return reset;
    },
    [reset],
  );

  return (
    <FormProvider {...methods}>
      <ApiFormErrorAlert
        hide={hideApiError}
        message={undefined} //FIXME:
        sx={{ mb: 3 }}
      />
      <Grid
        container
        direction="column"
        spacing={3}
        component="form"
        noValidate
        onSubmit={handleSubmit(() => {
          startTransition(() => {
            setHideApiError(false);

            //TODO:
            // if (isEditMode) updateCategoryAction({ ...category, ...data });
            // else createCategoryAction(data);
          });
        })}
      >
        <TextField
          {...register('amount', { setValueAs: normalizeNumberInput })}
          type="text"
          label="Amount"
          fullWidth
          required
          autoComplete="off"
          spellCheck="false"
          error={!!errors.amount}
          helperText={errors.amount?.message}
          disabled={disabledForm}
          slotProps={{
            htmlInput: { inputMode: 'decimal' },
            inputLabel: isEditMode ? { shrink: isEditMode } : undefined,
          }}
        />
        <Box>
          <Typography>Category</Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, 100px)',
              maxHeight: '458px',
              overflowY: 'auto',
              alignContent: 'start',
              columnGap: 1,
              rowGap: 4,
              mt: 1,
            }}
          >
            {categories.map(category => {
              const Icon = categoryIcons.find(
                icon => category.icon === icon.src,
              )!.Component;

              return (
                <Box key={category.id}>
                  <Icon
                    style={{
                      display: 'block',
                      borderRadius: '50%',
                      padding: '3px',
                      boxSizing: 'content-box',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                      backgroundColor: category.backgroundColor,
                      fill: category.strokeColor,
                      cursor: 'pointer',
                    }}
                  />
                  <Typography
                    color="common.white"
                    textAlign="center"
                    mt={0.3}
                    px={1}
                    fontSize="0.875rem"
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {category.name}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
        <Divider />
        <Button
          type="submit"
          //   TODO:
          //   disabled={
          //     !hideApiError &&
          //     (!!createCategoryErrors.api || !!updateCategoryErrors.api)
          //   }
          //   TODO:
          //   loading={isPendingCreate || isPendingUpdate}
          loadingPosition="start"
          startIcon={<SaveIcon />}
          variant="contained"
          fullWidth
        >
          Save
        </Button>
      </Grid>
    </FormProvider>
  );
}

function getDefaultValues(): ExpenseFormValues {
  return {
    amount: '',
  };
}

function normalizeNumberInput(value: string): number | '' {
  const normalized = String(value).trim().replace(',', '.');

  if (!normalized) return '';

  return +normalized;
}
