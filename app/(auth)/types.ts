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

type FormErrors<T> = Partial<Record<keyof T, string>> & {
  api?: string;
};

export type SignUpFormErrors = FormErrors<SignUpFormValues>;
export type SignInFormErrors = FormErrors<SignInFormValues>;
