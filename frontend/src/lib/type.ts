export interface SignUpFormProps {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface SignUpFormStateProps {
  isValidEmail: boolean;
  isValidUsername: boolean;
  isValidPhone: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
}

export interface LoginFormProps {
  keyLogin: string;
  password: string;
}

export interface LoginFormStateProps {
  isValidKeyLogin: boolean;
  isValidPassword: boolean;
}
