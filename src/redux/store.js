import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modalReducer from "./modal";

export const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer },
});
