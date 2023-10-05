import { createSelector } from "@reduxjs/toolkit";

const productSelector = (state) => state.product.data;
const statusSelector = (state) => state.product.status;
const errorSelector = (state) => state.product.error;

export const selectlistProduct = createSelector(
  [productSelector, statusSelector, errorSelector],
  (data, status, error) => {
    return {
      data: data,
      status: status,
      error: error,
    };
  }
);
