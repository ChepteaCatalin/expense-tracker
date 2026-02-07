export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInFormErrors extends SignInFormValues {
  api: string;
}
