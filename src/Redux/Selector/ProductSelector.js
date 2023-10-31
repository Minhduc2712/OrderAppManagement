import { createSelector } from "@reduxjs/toolkit";

const listProductSelector = (state) => state.product.listData;
const productByIdSelector = (state) => state.product.dataById;
const productByCategoryIdSelector = (state) => state.product.dataByCategoryId;
const statusSelector = (state) => state.product.status;
const errorSelector = (state) => state.product.error;
const searchedProductSelector = (state) => state.product.searchData;

export const selectlistProduct = createSelector(
  [listProductSelector, statusSelector, errorSelector],
  (listdata, status, error) => {
    return {
      listData: listdata,
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

export const selectProductById = createSelector(
  productByIdSelector,
  (dataById) => {
    return {
      dataById: dataById,
    };
  }
);

export const selectProductByCategoryId = createSelector(
  productByCategoryIdSelector,
  (dataByCategoryId) => {
    return {
      dataByCategoryId: dataByCategoryId,
    };
  }
);
