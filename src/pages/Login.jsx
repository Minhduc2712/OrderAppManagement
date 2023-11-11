import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { login } from "../Redux/Reducer/UserSliceReducer";
import { selectlistUserLogin } from "../Redux/Selector/UserSelector";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { getProductCartsByUserId } from "../store/shopping-cart/cartSliceReducer";

const Login = () => {
  const dispatch = useDispatch();
  const { data, error, isLoggedIn } = useSelector(selectlistUserLogin);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState([]);

  const initialValues = {
    username: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (formValues) => {
    const { username, password } = formValues;
    setLoading(true);
    setMessage("");

    try {
      const response = await dispatch(login({ username, password })).unwrap();
      const jwtToken = response.data.token;
      const userId = response.data.id;
      setMessage(error);
      setUser(data);
      const userPayload = {
        userId: userId,
        jwtToken: jwtToken,
      };
      saveTokenToCookie(userPayload);
      dispatch(getProductCartsByUserId(userId));
      // navigate("/admin");
    } catch (error) {
      setLoading(false);
      setMessage(error.message);
    }
  };

  const saveTokenToCookie = (userPayload) => {
    Cookies.set("userPayload", JSON.stringify(userPayload), { expires: 1 });
  };

  useEffect(() => {
    const userPayload = Cookies.get("userPayload");

    if (userPayload) {
      const { jwtToken, userId } = JSON.parse(userPayload);
      const decodedToken = jwt_decode(jwtToken);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp > currentTime) {
        dispatch(getProductCartsByUserId(userId));
      }
    }
  }, [dispatch, user.id]);

  if (isLoggedIn) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="col-md-12 login-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          {({ handleChange, values }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Field
                  name="username"
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e);
                    setMessage("");
                  }}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type="password"
                  className="form-control"
                  onChange={(e) => {
                    handleChange(e);
                    setMessage("");
                  }}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="alert alert-danger"
                />
              </div>

              <div className="form-group">
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Login</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>

        {message && (
          <div className="form-group">
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
