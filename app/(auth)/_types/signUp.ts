export interface SignUpFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormErrors extends SignUpFormValues {
  api: string;
}
