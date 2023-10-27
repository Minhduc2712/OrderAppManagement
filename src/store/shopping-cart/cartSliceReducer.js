import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADD_PRODUCT_TO_CART,
  DECREMENT_PRODUCT_FROM_CART,
  DELETE_PODUCT_FROM_CART,
  GET_CART_BY_USERID,
} from "../../Redux/ActionType/ActionType";
import {
  addCartwithProduct,
  decrementProducfromCart,
  getCartsByUserId,
  removeProductFromCart,
} from "../../API/CartApi";
import { values } from "lodash";

// Function to update local storage and state
const updateLocalStorage = (state) => {
  localStorage.setItem("cart", JSON.stringify(state.data));
  localStorage.setItem("totalAmount", JSON.stringify(state.totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(state.totalQuantity));
};

const initialState = {
  status: "idle",
  data: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
  totalAmount: localStorage.getItem("totalAmount")
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0,
  totalQuantity: localStorage.getItem("totalQuantity")
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0,
  error: null,
};

export const addProducttoCart = createAsyncThunk(
  ADD_PRODUCT_TO_CART,
  async (addToCart) => {
    let listProductCart = await addCartwithProduct(addToCart);
    return listProductCart;
  }
);

export const getProductCartsByUserId = createAsyncThunk(
  GET_CART_BY_USERID,
  async (id) => {
    let listProductCartbyId = await getCartsByUserId(id);
    return listProductCartbyId;
  }
);

export const deleteProductFromCart = createAsyncThunk(
  DELETE_PODUCT_FROM_CART,
  async (values) => {
    let cartDelete = await removeProductFromCart(values);
    return cartDelete;
  }
);

export const decrementProductFromCart = createAsyncThunk(
  DECREMENT_PRODUCT_FROM_CART,
  async (values) => {
    let cartDecrement = await decrementProducfromCart(values);
    return cartDecrement;
  }
);

const cartSliceReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProducttoCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addProducttoCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data.cart;
        state.totalAmount = action.payload.data.totalAmount;
        state.totalQuantity = action.payload.data.totalQuantity;
        state.error = null;

        updateLocalStorage(state);
      })
      .addCase(addProducttoCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getProductCartsByUserId.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProductCartsByUserId.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data.cart;
        state.totalAmount = action.payload.data.totalAmount;
        state.totalQuantity = action.payload.data.totalQuantity;
        state.error = null;

        updateLocalStorage(state);
      })
      .addCase(getProductCartsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(deleteProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data.cart;
        state.totalAmount = action.payload.data.totalAmount;
        state.totalQuantity = action.payload.data.totalQuantity;
        state.error = null;

        updateLocalStorage(state);
      })
      .addCase(deleteProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      })
      .addCase(decrementProductFromCart.pending, (state) => {
        state.status = "loading";
      })
      .addCase(decrementProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload.data.cart;
        state.totalAmount = action.payload.data.totalAmount;
        state.totalQuantity = action.payload.data.totalQuantity;
        state.error = null;

        updateLocalStorage(state);
      })
      .addCase(decrementProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const cartActions = cartSliceReducer.actions;
export default cartSliceReducer;
