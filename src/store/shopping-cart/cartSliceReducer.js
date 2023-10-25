import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADD_PRODUCT_TO_CART,
  GET_CART_BY_USERID,
} from "../../Redux/ActionType/ActionType";
import { addCartwithProduct, getCartsByUserId } from "../../API/CartApi";

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

const cartSliceReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.data.find(
        (item) => item.id === newItem.cartId
      );

      state.totalQuantity++;

      if (!existingItem) {
        state.data.push({
          id: newItem.cartId,
          userId: newItem.userId,
          price: newItem.productPrice,
          quantity: newItem.quantity,
        });
      } else {
        existingItem.quantity += newItem.quantity;
        existingItem.price += Number(newItem.price);
      }

      state.totalAmount = state.data.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      // Update local storage
      updateLocalStorage(state);
    },

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.data.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.data = state.data.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.price -= Number(existingItem.price);
      }

      state.totalAmount = state.data.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      // Update local storage
      updateLocalStorage(state);
    },

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.data.find((item) => item.id === id);

      if (existingItem) {
        state.data = state.data.filter((item) => item.id !== id);
        state.totalQuantity -= existingItem.quantity;
      }

      state.totalAmount = state.data.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      // Update local storage
      updateLocalStorage(state);
    },
  },
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

        // Update local storage
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

        // Update local storage
        updateLocalStorage(state);
      })
      .addCase(getProductCartsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const cartActions = cartSliceReducer.actions;
export default cartSliceReducer;
