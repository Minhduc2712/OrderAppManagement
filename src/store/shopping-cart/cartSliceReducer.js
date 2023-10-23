import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  ADD_PRODUCT_TO_CART,
  GET_CART_BY_USERID,
} from "../../Redux/ActionType/ActionType";
import { addCartwithProduct, getCartsByUserId } from "../../API/CartApi";

// const items =
//   localStorage.getItem("cartItems") !== null
//     ? JSON.parse(localStorage.getItem("cartItems"))
//     : [];

// const totalAmount =
//   localStorage.getItem("totalAmount") !== null
//     ? JSON.parse(localStorage.getItem("totalAmount"))
//     : 0;

// const totalQuantity =
//   localStorage.getItem("totalQuantity") !== null
//     ? JSON.parse(localStorage.getItem("totalQuantity"))
//     : 0;

// const setItemFunc = (item, totalAmount, totalQuantity) => {
//   localStorage.setItem("cartItems", JSON.stringify(item));
//   localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
//   localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
// };

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

const data =
  localStorage.getItem("cart") !== null
    ? JSON.parse(localStorage.getItem("cart"))
    : [];

const totalAmount =
  localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;

const totalQuantity =
  localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;

const setItemFunc = (data, totalAmount, totalQuantity) => {
  localStorage.setItem("cart", JSON.stringify(data));
  localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
  localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
};

const initialState = {
  status: "idle",
  data: data,
  totalAmount: totalAmount,
  totalQuantity: totalQuantity,
  message: null,
};

const cartSliceReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      console.log("newItem", newItem);
      const existingItem = state.data.find((item) => item.id === newItem.id);
      state.totalQuantity++;

      if (!existingItem) {
        state.data.push({
          id: newItem.productId,
          user: newItem.userId,
          price: newItem.price,
          quantity: 1, // Initialize quantity when adding a new item
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += Number(newItem.price);
      }

      state.totalAmount = state.data.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.data.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    // ========= remove item ========

    removeItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      state.totalQuantity--;

      if (existingItem.quantity === 1) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice =
          Number(existingItem.totalPrice) - Number(existingItem.price);
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );

      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
    },

    //============ delete item ===========

    deleteItem(state, action) {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;
      }

      state.totalAmount = state.cartItems.reduce(
        (total, item) => total + Number(item.price) * Number(item.quantity),
        0
      );
      setItemFunc(
        state.cartItems.map((item) => item),
        state.totalAmount,
        state.totalQuantity
      );
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
      })
      .addCase(getProductCartsByUserId.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const cartActions = cartSliceReducer.actions;
export default cartSliceReducer;
