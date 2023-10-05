import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FETCH_LIST_PRODUCT1 } from "../ActionType/ActionType";
import { getListFilterdProductAPI } from "../../API/ProductApi";

// Async thunk for fetching paginated list of products
export const actionFetchPaginationListProductAPI = createAsyncThunk(
  FETCH_LIST_PRODUCT1,
  async (params) => {
    try {
      const response = await getListFilterdProductAPI(params);
      return response.data; // Assuming your API response contains a 'data' property
    } catch (error) {
      throw error;
    }
  }
);

const initialState = {
  content: [],
  pageNo: 1,
  pageSize: 4,
  totalElements: 0,
  totalPages: 0,
};

const PaginationSliceReducer = createSlice({
  name: "post1",
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
    builder
      .addCase(actionFetchPaginationListProductAPI.fulfilled, (state, action) => {
        state.content = action.payload;
        state.pageNo = action.meta.arg.pageNo; // Access the argument passed to the thunk
        state.pageSize = action.meta.arg.pageSize; // Access the argument passed to the thunk
        state.totalElements = action.meta.arg.totalElements; // Access the argument passed to the thunk
        state.totalPages = action.meta.arg.totalPages; // Access the argument passed to the thunk
      });
  },
});

export const { setPageNo, setPageSize, setTotalElements, setTotalPages } = PaginationSliceReducer.actions;

export default PaginationSliceReducer.reducer;