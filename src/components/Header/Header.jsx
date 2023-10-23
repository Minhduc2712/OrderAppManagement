import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "reactstrap";
import logo from "../../assets/images/res-logo.png";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "react-bootstrap";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "../../styles/header.css";
import { cartUiActions } from "../../store/shopping-cart/cartUiSlice";
import { selectlistUser } from "../../Redux/Selector/UserSelector";
import { logout } from "../../Redux/Reducer/UserSliceReducer";
import { selectlistProductCart } from "../../store/shopping-cart/cartSelector";
import { getProductCartsByUserId } from "../../store/shopping-cart/cartSliceReducer";

const navLinks = [
  { display: "Home", path: "/home" },
  { display: "Foods", path: "/pizzas" },
  { display: "Cart", path: "/cart" },
  { display: "Contact", path: "/contact" },
];

const logStatus = [
  { display: "Login", path: "/login" },
  { display: "Register", path: "/register" },
];

const Header = () => {
  const menuRef = useRef(null);
  const headerRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: user, isLoggedIn } = useSelector(selectlistUser);
  const { data, totalQuantity, status } = useSelector(selectlistProductCart);

  const toggleMenu = () => menuRef.current.classList.toggle("show__menu");
  const toggleCart = () => dispatch(cartUiActions.toggle());

  const tokenString = Cookies.get("userPayload");

  const isUserLoggedIn = () => {
    if (tokenString) {
      try {
        const token = JSON.parse(tokenString);
        const jwtToken = token.jwtToken;
        const decodedToken = jwt_decode(jwtToken);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp > currentTime;
      } catch (error) {
        console.error("Invalid token:", error);
        return false;
      }
    }
    return false;
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
    navigate("/login");
    window.location.reload();
  };

  useEffect(() => {
    const fetchCartData = async () => {
      if (tokenString) {
        const token = JSON.parse(tokenString);
        const jwtToken = token.jwtToken;
        const userId = token.userId;

        if (jwtToken) {
          const decodedToken = jwt_decode(jwtToken);
          const currentTime = Date.now() / 1000;

          if (decodedToken.exp > currentTime) {
            const savedCart = localStorage.getItem("cart");

            if (savedCart) {
              const parsedCart = JSON.parse(savedCart);
            } else {
              const response = await dispatch(getProductCartsByUserId(userId));
              if (response.payload.data && response.payload.data.cart) {
                localStorage.setItem(
                  "cart",
                  JSON.stringify(response.payload.data.cart)
                );
                localStorage.setItem(
                  "totalQuantity",
                  JSON.stringify(response.payload.data.totalQuantity)
                );
              }
            }
          }
        }
      }
    };
    fetchCartData();
  }, [tokenString, data]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      const loggedIn = isUserLoggedIn();
      if (loggedIn) {
        navigate("/");
      }
    }
  }, [isLoggedIn]);

  return (
    <header className="header" ref={headerRef}>
      <Container>
        <div className="nav__wrapper d-flex align-items-center justify-content-between">
          <div className="logo" onClick={() => navigate("/home")}>
            <img src={logo} alt="logo" />
            <h5>Tasty Treat</h5>
          </div>
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <div className="menu d-flex align-items-center gap-5">
              <div className="header__closeButton" onClick={toggleMenu}>
                <span>
                  <i className="ri-close-fill"></i>
                </span>
              </div>
              {navLinks.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? "active__menu" : ""
                  }
                  onClick={toggleMenu}
                >
                  {item.display}
                </NavLink>
              ))}
              {isLoggedIn ? (
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                logStatus.map((item, index) => (
                  <NavLink
                    to={item.path}
                    key={index}
                    className={(navClass) =>
                      navClass.isActive ? "active__menu" : ""
                    }
                    onClick={toggleMenu}
                  >
                    {item.display}
                  </NavLink>
                ))
              )}
            </div>
          </div>
          <div className="nav__right d-flex align-items-center gap-4">
            <span className="cart__icon" onClick={toggleCart}>
              <i className="ri-shopping-basket-line"></i>
              <span className="cart__badge">{totalQuantity}</span>
            </span>
            <span className="mobile__menu" onClick={toggleMenu}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
