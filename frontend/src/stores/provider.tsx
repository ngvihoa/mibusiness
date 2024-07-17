"use client";

import { store } from "./store";
import { Provider } from "react-redux";
import React from "react";
import { persistStore } from "redux-persist";

persistStore(store);
export function ReduxProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
