import { createSelector } from "@reduxjs/toolkit";
import { data } from "jquery";

const productSelector = (state) => state.product.data;
const statusSelector = (state) => state.product.status;
const errorSelector = (state) => state.product.error;
const searchedProductSelector = (state) => state.product.searchData;

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

export const selectlistSearchedProduct = createSelector(
  searchedProductSelector,
  (searchData) => {
    return {
      data: searchData,
    };
  }
);
