import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/autsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});