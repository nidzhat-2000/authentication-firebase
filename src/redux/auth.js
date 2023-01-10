import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.user = action.payload;
    },
    logOut: (state) => {
      state.user = false;
    },
  },
});

export const { logIn, logOut } = authSlice.actions;

export default authSlice.reducer;
