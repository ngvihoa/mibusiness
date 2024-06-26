export type createUserFormProps = {
  [key: string]: string;
  email: string;
  username: string;
  phone: string;
  password: string;
  sex: string;
  groupId: string;
  address: string;
};

export type createUserFormStateProps = {
  email: boolean;
  username: boolean;
  phone: boolean;
  password: boolean;
  sex?: boolean;
  groupId: boolean;
  address?: boolean;
};

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

export type InitialState = {
  value: AuthState;
};

export type AuthState = {
  isAuth: boolean;
  accessToken: string;
  email: string;
  username: string;
};

export type LoginType = {
  accessToken: string;
  email: string;
  username: string;
};

export type GroupType = {
  id: number;
  name: string;
  description: string;
};

export type UsersType = {
  id: string;
  email: string;
  username: string;
  phone: string;
  sex: string;
  address: string;
  Group: GroupType | null;
};

export type ModalTextProps = {
  headingText: string;
  bodyText: string;
};

export type GroupDBGet = {
  createdAt: string;
  updatedAt: string;
  description: string;
  id: number;
  name: string;
};

export type RoleType = {
  url: string;
  description: string;
};

export type RoleDBType = {
  id: number;
  url: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
};

export type GroupRoleType = {
  groupId: number;
  roleId: number;
};

export type ButtonProps = {
  onClickFunction?: () => void;
  className?: string;
  variant?: string;
  children: React.ReactNode;
};

export type GroupPostType = {
  name: string;
  description: string;
};
