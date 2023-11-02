import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

import "../../../styles/product-card.css";
import { addProducttoCart } from "../../../store/shopping-cart/cartSliceReducer";

const ProductCard = ({ item }) => {
  const dispatch = useDispatch();
  const { id, name, img, price, country, rate } = item;

  const tokenString = Cookies.get("userPayload");
  let userId = null;
  const productId = id;

  if (tokenString) {
    const token = JSON.parse(tokenString);
    userId = token.userId;
  }

  const navigate = useNavigate();

  const addToCart = async () => {
    const qty = 1;
    if (tokenString) {
      const formValuesDB = { productId, userId, qty, price };
      dispatch(addProducttoCart(formValuesDB));
    } else {
      navigate("/login");
    }
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

export default React.memo(ProductCard);
