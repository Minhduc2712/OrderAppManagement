import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import Cookies from "js-cookie";

import "../../../styles/product-card.css";
import { selectlistUser } from "../../../Redux/Selector/UserSelector";
import {
  addProducttoCart,
  cartActions,
  getProductCartsByUserId,
} from "../../../store/shopping-cart/cartSliceReducer";
import { selectlistProductCart } from "../../../store/shopping-cart/cartSelector";
import { getCartsByUserId } from "../../../API/CartApi";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { id, name, img, price, country, rate } = item;

  const tokenString = Cookies.get("userPayload");
  let userId = null;
  let cartId = null;
  let productPrice = null;
  const productId = id;

  const [responseCart, setResponseCart] = useState([]);

  if (tokenString) {
    const token = JSON.parse(tokenString);
    userId = token.userId;
  }

  const addToCart = async () => {
    const fetchData = async () => {
      if (userId) {
        const response = await dispatch(getProductCartsByUserId(userId));
        const cartItems = response.payload.data.cart;

        setResponseCart(cartItems);

        // Check if the product is already in the cart
        const existingCartItem = cartItems.find(
          (cartItem) => cartItem.productId === productId
        );

        if (existingCartItem) {
          cartId = existingCartItem.id;
          productPrice = existingCartItem.price;
          console.log("cartId", cartId);
        }
      }
    };
    fetchData();
    console.log("productId", productId);
    console.log("id", id);
    const qty = 1;
    const formValuesDB = { productId, userId, qty, price };
    const formValuesLocal = { cartId, userId, qty, productPrice };
    dispatch(cartActions.addItem(formValuesLocal));
    dispatch(addProducttoCart(formValuesDB));
  };

  return (
    <div className="product__item d-flex flex-column justify-content-between">
      <div className="product__content">
        <img className="product__img w-50" src={img} alt="Pizza" />
        <h5>
          <Link to={`/pizzas/${id}`}>{name}</Link>
        </h5>
        <h6>{country}</h6>
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        {rate}
      </div>
      <div className="d-flex flex-column align-items-center justify-content-between">
        <span className="product__price mb-2">{price} €</span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
