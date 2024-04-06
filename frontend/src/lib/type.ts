export interface FormProps {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface FormStateProps {
  isValidEmail: boolean;
  isValidUsername: boolean;
  isValidPhone: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
}
