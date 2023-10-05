import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./shopping-cart/cartSlice";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import ProductSliceReducer from "../Redux/Reducer/MenuSliceReducer";
import PaginationSliceReducer from "../Redux/Reducer/PaginationSliceReducer";
import UserSliceReducer from "../Redux/Reducer/UserSliceReducer";

const store = configureStore({
  reducer: {
    product: ProductSliceReducer.reducer,
    post1: PaginationSliceReducer.reducer,
    user: UserSliceReducer.reducer,
    cart: cartSlice.reducer,
    cartUi: cartUiSlice.reducer,
  },
  middleware: [thunk, logger],
});

export default store;
