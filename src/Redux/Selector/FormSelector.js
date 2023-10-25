import { createSelector } from "@reduxjs/toolkit";
import { showForm } from "../Reducer/FormSliceReducer";

const formSelector = (state) => state.form.showForm;

export const selectFormStatus = createSelector([formSelector], (showForm) => {
  return { showForm: showForm };
});
