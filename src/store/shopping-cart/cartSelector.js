import { createSelector } from "@reduxjs/toolkit";

const cartProductSelector = (state) => state.cart.data;
const totalQuantitySelector = (state) => state.cart.totalQuantity;
const totalAmountSelector = (state) => state.cart.totalAmount;
const statusSelector = (state) => state.cart.status;
const errorSelector = (state) => state.cart.error;

export const selectlistProductCart = createSelector(
  [
    cartProductSelector,
    totalQuantitySelector,
    totalAmountSelector,
    statusSelector,
    errorSelector,
  ],
  (data, totalQuantity, totalAmount, status, error) => {
    return {
      data: data,
      totalQuantity: totalQuantity,
      totalAmount: totalAmount,
      status: status,
      error: error,
    };
  }
);
