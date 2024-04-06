import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistenceConfig = {
  auth: {
    key: "auth",
    version: 1,
    storage,
  },
};

const persistedReducer: any = combineReducers({
  auth: persistReducer(persistenceConfig["auth"], authReducer),
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
