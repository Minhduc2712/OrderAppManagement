import { api } from "./api";

const addCartwithProduct = (addToCart) => {
  return api("POST", "cart/addProduct", addToCart);
};

const decrementProducfromCart = (decrementItem) => {
  return api("POST", "cart/decrementProduct", decrementItem);
};

const updateQtyForCart = (upateQty) => {
  return api("POST", "cart/updateQtyFor", upateQty);
};

const removeProductFromCart = (removeItem) => {
  return api("DELETE", "cart/removeProductFromCart", removeItem);
};

const getCartsByUserId = (id) => {
  let url = "cart/getCartsByUserId/" + id;
  return api("GET", url, null);
};

export {
  addCartwithProduct,
  decrementProducfromCart,
  updateQtyForCart,
  removeProductFromCart,
  getCartsByUserId,
};
