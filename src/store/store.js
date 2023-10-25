import { configureStore } from "@reduxjs/toolkit";
import cartUiSlice from "./shopping-cart/cartUiSlice";
import logger from "redux-logger";
import thunk from "redux-thunk";
import ProductSliceReducer from "../Redux/Reducer/MenuSliceReducer";

import UserSliceReducer from "../Redux/Reducer/UserSliceReducer";
import PaginationSliceReducer from "../Redux/Reducer/PaginationSliceReducer";
import cartSliceReducer from "./shopping-cart/cartSliceReducer";
import FormSliceReducer from "../Redux/Reducer/FormSliceReducer";
import CategorySliceReducer from "../Redux/Reducer/CategorySliceReducer";

const store = configureStore({
  reducer: {
    form: FormSliceReducer.reducer,
    category: CategorySliceReducer.reducer,
    product: ProductSliceReducer.reducer,
    post: PaginationSliceReducer.reducer,
    user: UserSliceReducer.reducer,
    cart: cartSliceReducer.reducer,
    cartUi: cartUiSlice.reducer,
  },
  middleware: [thunk, logger],
});

export default store;
