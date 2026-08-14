import type { FormErrors } from "@/types/form";

export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export type SignUpFormErrors = FormErrors<SignUpFormValues>;
export type SignInFormErrors = FormErrors<SignInFormValues>;
