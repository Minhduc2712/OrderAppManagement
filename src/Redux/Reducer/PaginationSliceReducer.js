import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_LIST_PRODUCT_PAGINATION } from "../ActionType/ActionType";
import { getListFilterdProductAPI } from "../../API/ProductApi";

// Async thunk for fetching paginated list of products
export const actionFetchPaginationListProductAPI = createAsyncThunk(
  FETCH_LIST_PRODUCT_PAGINATION,
  async (params) => {
    try {
      let response = await getListFilterdProductAPI(params);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  content: [],
  pageNo: 0,
  pageSize: 12,
  totalElements: 0,
  totalPages: 0,
};

const PaginationSliceReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPageNo: (state, action) => {
      state.pageNo = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalElements: (state, action) => {
      state.totalElements = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      actionFetchPaginationListProductAPI.fulfilled,
      (state, action) => {
        console.log("Action Payload:", action.payload);
        if (action.payload) {
          console.log("Content:", action.payload.content);
          state.content = action.payload.content;
          state.pageNo = action.payload.pageNo;
          state.pageSize = action.payload.pageSize;
          state.totalElements = action.payload.totalElements;
          state.totalPages = action.payload.totalPages;
          console.log(state.totalElements);
          console.log(state.totalPages);
        }
      }
    );
  },
});

export const { setPageNo, setPageSize, setTotalElements, setTotalPages } =
  PaginationSliceReducer.actions;

export default PaginationSliceReducer;
