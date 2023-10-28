import { createSelector } from "@reduxjs/toolkit";

const formCreateSelector = (state) => state.form.showFormCreate;
const formEditSelector = (state) => state.form.showFormEdit;

export const selectFormStatus = createSelector(
  [formCreateSelector, formEditSelector],
  (showFormCreate, showFormEdit) => {
    return { showFormCreate: showFormCreate, showFormEdit: showFormEdit };
  }
);
