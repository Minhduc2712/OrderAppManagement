import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.user.data;
const statusSelector = (state) => state.user.status;
const messageSelector = (state) => state.user.error;
const isLoggedInSelector = (state) => state.user.isLoggedIn;
const isAdminSelector = (state) => state.user.isAdmin;

export const selectlistUser = createSelector(
  [
    userSelector,
    statusSelector,
    messageSelector,
    isLoggedInSelector,
    isAdminSelector,
  ],
  (data, status, error, isLoggedIn, isAdmin) => {
    return {
      data: data,
      status: status,
      error: error,
      isLoggedIn: isLoggedIn,
      isAdmin: isAdmin,
    };
  }
);
