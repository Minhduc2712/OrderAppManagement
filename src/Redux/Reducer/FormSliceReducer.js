import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showForm: false,
};

const formSliceReducer = createSlice({
  name: "form",
  initialState,
  reducers: {
    showForm: (state) => {
      state.showForm = true;
    },

    // Action to close the form
    closeForm: (state) => {
      state.showForm = false;
    },
  },
});

export const formActions = formSliceReducer.actions;
export default formSliceReducer;
