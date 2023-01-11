import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import modalReducer from "./modal";
import todosReducer from "./todos";

export const store = configureStore({
  reducer: { auth: authReducer, modal: modalReducer, todos: todosReducer },
});
