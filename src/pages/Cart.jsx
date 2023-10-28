import React, { useCallback, useEffect, useState } from "react";

import CommonSection from "../components/UI/common-section/CommonSection";
import Helmet from "../components/Helmet/Helmet";
import "../styles/cart-page.css";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "reactstrap";

import { Link } from "react-router-dom";

import { deleteProductFromCart } from "../store/shopping-cart/cartSliceReducer";
import { actionFetchProductById } from "../Redux/Reducer/MenuSliceReducer";
import Cookies from "js-cookie";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.data);
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  return (
    <Helmet title="Cart">
      <CommonSection title="Your Cart" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              {cartItems.length === 0 ? (
                <h5 className="text-center">Your cart is empty</h5>
              ) : (
                <>
                  <h5 className="mb-5">Summary of your order</h5>
                  <table className="table table-bordered mb-5 align-middle text-center">
                    <thead>
                      <tr>
                        <th>Image</th>
                        <th>Product Title</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => (
                        <Tr item={item} key={item.id} />
                      ))}
                    </tbody>
                  </table>
                </>
              )}

              <div className="mt-4">
                <h6>
                  Subtotal: $
                  <span className="cart__subtotal">{totalAmount}</span>
                </h6>
                <p>Taxes and shipping will calculate at checkout</p>
                <div className="cart__page-btn">
                  <button className="addTOCart__btn me-4">
                    <Link to="/pizzas">Continue Shopping</Link>
                  </button>
                  <button className="addTOCart__btn">
                    <Link to="/checkout">Proceed to checkout</Link>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

const Tr = ({ item }) => {
  const dispatch = useDispatch();
  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const { id, quantity, productId } = item;
  const cartId = id;
  const tokenString = Cookies.get("userPayload");
  let userId;
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
  }, [dispatch, id, productId]);
  const deleteItem = useCallback(() => {
    const formValuesDB = { cartId, userId };
    dispatch(deleteProductFromCart(formValuesDB));
  }, [dispatch, userId, cartId]);
  return (
    <tr>
      <td className="text-center cart__img-box">
        <img src={img} alt="" />
      </td>
      <td className="text-center">{name}</td>
      <td className="text-center">${price}</td>
      <td className="text-center">{quantity}</td>
      <td className="text-center cart__item-del">
        <i className="ri-delete-bin-line" onClick={deleteItem}></i>
      </td>
    </tr>
  );
};

export default Cart;
