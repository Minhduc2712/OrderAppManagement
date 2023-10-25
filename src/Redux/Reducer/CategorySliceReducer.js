import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_LIST_CATEGORY } from "../ActionType/ActionType";
import { getListCategoryAPI } from "../../API/CategoryApi";

export const actionFetchListCategoryAPI = createAsyncThunk(
  FETCH_LIST_CATEGORY,
  async () => {
    let listCategoryAPI = await getListCategoryAPI();
    return listCategoryAPI;
  }
);

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const CategorySliceReducer = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(actionFetchListCategoryAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionFetchListCategoryAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        console.log(state.data);
        state.error = null;
      })
      .addCase(actionFetchListCategoryAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { actions } = CategorySliceReducer;
export default CategorySliceReducer;
