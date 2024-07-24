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
