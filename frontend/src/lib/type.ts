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

export type InitialState = {
  value: AuthState;
};

export type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  role: string;
};

export type LoginType = {
  username: string;
  id: string;
  role: string;
};

export interface GroupType {
  name: string;
  description: string;
}

export interface UsersType {
  id: string;
  email: string;
  username: string;
  phone: string;
  sex: string;
  Group: GroupType | null;
}

export interface ModalTextProps {
  headingText: string;
  bodyText: string;
}
