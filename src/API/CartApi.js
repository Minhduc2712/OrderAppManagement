import { api } from "./api";

const addCartwithProduct = (addToCart) => {
  return api("POST", "cart/addProduct", addToCart);
};

const updateQtyForCart = (upateQty) => {
  return api("POST", "cart/updateQtyFor", upateQty);
};

const removeProductFromCart = () => {
  return api("DELETE", "cart/removeProductFromCart", null);
};

const getCartsByUserId = (id) => {
  let url = "cart/getCartsByUserId/" + id;
  return api("GET", url, null);
};

export {
  addCartwithProduct,
  updateQtyForCart,
  removeProductFromCart,
  getCartsByUserId,
};
