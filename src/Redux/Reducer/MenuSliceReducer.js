import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getListProductAPI, searchProductAPI } from "../../API/ProductApi";
import { FETCH_LIST_PRODUCT, SEARCH_PRODUCT } from "../ActionType/ActionType";

export const actionFetchListProductAPI = createAsyncThunk(
  FETCH_LIST_PRODUCT,
  async () => {
    let listProductAPI = await getListProductAPI();

    return listProductAPI;
  }
);

export const actionFetchSearchedProductAPI = createAsyncThunk(
  SEARCH_PRODUCT,
  async (params) => {
    try {
      let response = await searchProductAPI(params);
      return response; // Assuming your API response contains a 'data' property
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  status: "idle",
  data: [],
  searchData: [],
  error: null,
};

const ProductSliceReducer = createSlice({
  name: "products",
  initialState,
  reducers: {},
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
      })
      .addCase(actionFetchSearchedProductAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionFetchSearchedProductAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.searchData = action.payload;
        state.error = null;
      })
      .addCase(actionFetchSearchedProductAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { actions } = ProductSliceReducer;
export default ProductSliceReducer;
