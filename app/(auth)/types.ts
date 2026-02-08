export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormErrors extends SignUpFormValues {
  api: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInFormErrors extends SignInFormValues {
  api: string;
}
