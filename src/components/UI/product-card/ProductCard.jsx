import React from "react";

import "../../../styles/product-card.css";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  addProducttoCart,
  cartActions,
  getProductCartsByUserId,
} from "../../../store/shopping-cart/cartSliceReducer";
import { selectlistUser } from "../../../Redux/Selector/UserSelector";
import Cookies from "js-cookie";

const ProductCard = (props) => {
  const { id, name, img, price, extraIngredients, country, rate } = props.item;
  const { data: User, status, error } = useSelector(selectlistUser);

  const tokenString = Cookies.get("userPayload");
  let userId;

  if (tokenString) {
    const token = JSON.parse(tokenString);
    const jwtToken = token.jwtToken;
    userId = token.userId;
  }

  const productId = id;
  const qty = 1;

  const dispatch = useDispatch();

  const addToCart = async () => {
    const formValues = { productId, userId, qty, price };
    console.log("formValues", formValues);
    dispatch(cartActions.addItem(formValues));
    dispatch(addProducttoCart(formValues));
    // dispatch(getProductCartsByUserId(userId));
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
        <span className="product__price mb-2">{price} € </span>
        <button className="addTOCART__btn" onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
