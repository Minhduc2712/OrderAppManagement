import { createSelector } from "@reduxjs/toolkit";

const userSelector = (state) => state.user.data;
const statusSelector = (state) => state.user.status;
const messageSelector = (state) => state.user.error;
const isLoggedInSelector = (state)=> state.user.isLoggedIn;

export const selectlistUser = createSelector(
  [userSelector, statusSelector, messageSelector, isLoggedInSelector],
  (data, status, error, isLoggedIn) => {
    return {
      data: data,
      status: status,
      error:error,
      isLoggedIn:isLoggedIn,
    };
  }
);
