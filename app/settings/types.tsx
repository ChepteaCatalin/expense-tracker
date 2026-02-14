import { FormErrors } from '@/types/form';

export interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type ChangePasswordFormErrors = FormErrors<ChangePasswordFormValues>;

export type ChangeCurrencyError = {
  api?: string;
  currency?: string;
};
