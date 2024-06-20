import { AuthState, InitialState, LoginType } from "src/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    accessToken: "",
    email: "",
    username: "",
  } as AuthState,
} as InitialState;

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },
    logIn: (state, action: PayloadAction<LoginType>) => {
      return {
        value: {
          isAuth: true,
          accessToken: action.payload.accessToken,
          email: action.payload.email,
          username: action.payload.username,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
