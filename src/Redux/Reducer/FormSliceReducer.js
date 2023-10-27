import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showFormCreate: false,
  showFormEdit: false,
};

const formSliceReducer = createSlice({
  name: "form",
  initialState,
  reducers: {
    showFormCreate: (state) => {
      state.showFormCreate = true;
    },

    showFormEdit: (state) => {
      state.showFormEdit = true;
    },

    // Action to close the form
    closeForm: (state) => {
      state.showFormCreate = false;
      state.showFormEdit = false;
    },
  },
});

export const formActions = formSliceReducer.actions;
export default formSliceReducer;
