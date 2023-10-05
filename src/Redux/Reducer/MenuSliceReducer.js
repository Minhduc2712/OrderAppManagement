import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListProductAPI } from "../../API/ProductApi";
import { FETCH_LIST_PRODUCT } from "../ActionType/ActionType";

export const actionFetchListProductAPI = createAsyncThunk(
  FETCH_LIST_PRODUCT,
  async () => {
    let listProductAPI = await getListProductAPI();

    return listProductAPI;
  }
);

const initialState = {
  status: "idle",
  data: [],
  error: null,
};

const ProductSliceReducer = createSlice({
  name: "products",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(actionFetchListProductAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionFetchListProductAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(actionFetchListProductAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { actions } = ProductSliceReducer;
export default ProductSliceReducer;
