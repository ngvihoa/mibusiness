import { AuthState, InitialState, LoginType } from "../../lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    role: "",
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
          username: action.payload.username,
          uid: action.payload.id, // should generate the id
          role: action.payload.role,
        },
      };
    },
  },
});

export const { logIn, logOut } = auth.actions;
export default auth.reducer;
