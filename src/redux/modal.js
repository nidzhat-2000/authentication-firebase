import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  data: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.open = action.payload.name;
      state.data = action.payload.data || false;
    },
    closeModal: (state) => {
      state.open = false;
      state.data = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
