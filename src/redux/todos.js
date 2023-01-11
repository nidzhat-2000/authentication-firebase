import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    appendTodo: (state, action) => {
      state.todos = [...state.todos, action.payload];
    },
  },
});

export const { setTodos, appendTodo } = todosSlice.actions;

export default todosSlice.reducer;
