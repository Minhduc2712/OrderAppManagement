import React, { useCallback, useEffect, useState } from "react";
import { ListGroupItem } from "reactstrap";
import { useNavigate } from "react-router-dom";

import "../../../styles/cart-item.css";

import { useDispatch, useSelector } from "react-redux";
import {
  addProducttoCart,
  cartActions,
} from "../../../store/shopping-cart/cartSliceReducer";
import Cookies from "js-cookie";
import { selectlistUser } from "../../../Redux/Selector/UserSelector";
import { actionFetchProductById } from "../../../Redux/Reducer/MenuSliceReducer";

const CartItem = ({ item, onClose }) => {
  const dispatch = useDispatch();
  const { id, productPrice, quantity, productId } = item;
  const { data: User, status, error } = useSelector(selectlistUser);

  const tokenString = Cookies.get("userPayload");
  const cartId = id;
  let userId;
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();

  if (tokenString) {
    const token = JSON.parse(tokenString);
    userId = token.userId;
  }

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const response = await dispatch(actionFetchProductById(productId));
        console.log("response", response.payload);
        setName(response.payload.name);
        setImg(response.payload.img);

        if (response.payload && response.payload.price) {
          setPrice(response.payload.price);
        } else {
        }
      }
    };
    fetchData();
  }, [tokenString]);

  const qty = 1;

  const incrementItem = useCallback(() => {
    const formValuesDB = { productId, userId, qty, price };
    const formValuesLocal = { cartId, userId, qty, productPrice };
    dispatch(cartActions.addItem(formValuesLocal));
    dispatch(addProducttoCart(formValuesDB));
  }, [productId, userId, quantity, productPrice, price, cartId]);

  const decrementItem = useCallback(() => {
    const formValuesDB = { productId, userId, qty, price };
    const formValuesLocal = { cartId, userId, qty, productPrice };
    dispatch(cartActions.removeItem(formValuesLocal));
    dispatch(addProducttoCart(formValuesDB));
  }, [productId, userId, quantity, productPrice, price, cartId]);

  const deleteItem = useCallback(() => {
    const formValuesDB = { productId, userId, qty, price };
    const formValuesLocal = { cartId, userId, qty, productPrice };
    dispatch(cartActions.addItem(formValuesLocal));
    dispatch(addProducttoCart(formValuesDB));
  }, [productId, userId, quantity, productPrice, price, cartId]);

  return (
    <ListGroupItem className="border-0 cart__item">
      <div className="cart__item-info d-flex gap-2">
        <img src={img} alt="product-img" />

        <div className="cart__product-info w-100 d-flex align-items-center gap-4 justify-content-between">
          <div>
            <h6 className="cart__product-title">{name}</h6>
            <p className=" d-flex align-items-center gap-5 cart__product-price">
              {quantity}x <span>${quantity * price}</span>
            </p>
            <div className=" d-flex align-items-center justify-content-between increase__decrease-btn">
              <span className="increase__btn" onClick={incrementItem}>
                <i class="ri-add-line"></i>
              </span>
              <span className="quantity">{quantity}</span>
              <span className="decrease__btn" onClick={decrementItem}>
                <i class="ri-subtract-line"></i>
              </span>
            </div>
          </div>

          <span className="delete__btn" onClick={deleteItem}>
            <i class="ri-close-line"></i>
          </span>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
