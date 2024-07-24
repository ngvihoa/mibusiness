export type SignUpFormProps = {
  email: string;
  username: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type SignUpFormStateProps = {
  isValidEmail: boolean;
  isValidUsername: boolean;
  isValidPhone: boolean;
  isValidPassword: boolean;
  isValidConfirmPassword: boolean;
};

export type LoginFormProps = {
  keyLogin: string;
  password: string;
};

export type LoginFormStateProps = {
  isValidKeyLogin: boolean;
  isValidPassword: boolean;
};
