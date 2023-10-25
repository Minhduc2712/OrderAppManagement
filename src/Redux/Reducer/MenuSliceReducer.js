import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProductNewAPI,
  deleteProductAPI,
  getListProductAPI,
  getProductByIdAPI,
  searchProductAPI,
} from "../../API/ProductApi";
import {
  ADD_PRODUCT,
  DELETE_PRODUCT,
  FETCH_LIST_PRODUCT,
  FETCH_PRODUCT_BY_ID,
  SEARCH_PRODUCT,
} from "../ActionType/ActionType";

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

export const actionFetchProductById = createAsyncThunk(
  FETCH_PRODUCT_BY_ID,
  async (id) => {
    let ProductAPI = await getProductByIdAPI(id);
    return ProductAPI;
  }
);

export const actionAddProductAPI = createAsyncThunk(
  ADD_PRODUCT,
  async (Values) => {
    let reponse = await addProductNewAPI(Values);
    return reponse;
  }
);

export const actionDeleteProductAPI = createAsyncThunk(
  DELETE_PRODUCT,
  async (id) => {
    let response = await deleteProductAPI(id);
    return response;
  }
);

const initialState = {
  status: "idle",
  listData: [],
  dataById: [],
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
        state.listData = action.payload.data;
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
      })
      .addCase(actionFetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionFetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataById = action.payload;
        state.error = null;
      })
      .addCase(actionFetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(actionDeleteProductAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionDeleteProductAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listData = action.payload.data;
        state.error = null;
      })
      .addCase(actionDeleteProductAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(actionAddProductAPI.pending, (state) => {
        state.status = "loading";
      })
      .addCase(actionAddProductAPI.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.listData = action.payload.data;
        state.error = null;
      })
      .addCase(actionAddProductAPI.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { actions } = ProductSliceReducer;
export default ProductSliceReducer;
