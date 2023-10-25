import { createSelector } from "@reduxjs/toolkit";
import { data } from "jquery";

const listCategorySelector = (state) => state.category.data;
const statusSelector = (state) => state.category.status;
const errorSelector = (state) => state.category.error;

export const selectlistCategory = createSelector(
  [listCategorySelector, statusSelector, errorSelector],
  (data, status, error) => {
    return {
      data: data,
      status: status,
      error: error,
    };
  }
);
