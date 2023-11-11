import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "bootstrap/dist/css/bootstrap.min.css";

import * as Yup from "yup";
import { register } from "../Redux/Reducer/UserSliceReducer";
import { selectlistUserRegister } from "../Redux/Selector/UserSelector";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";

const Register = () => {
  // Lấy thông tin lỗi từ Redux state
  const { error } = useSelector(selectlistUserRegister);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  // Sử dụng useDispatch để gửi các action đến Redux store
  const dispatch = useDispatch();

  // Khởi tạo giá trị ban đầu cho các trường của form
  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  // Định nghĩa schema để kiểm tra tính hợp lệ của form sử dụng Yup
  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    lastName: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    username: Yup.string()
      .test(
        "len",
        "The username must be between 3 and 20 characters.",
        (val) =>
          val && val.toString().length >= 3 && val.toString().length <= 20
      )
      .required("This field is required!"),
    email: Yup.string()
      .email("This is not a valid email.")
      .required("This field is required!"),
    password: Yup.string()
      .test(
        "len",
        "The password must be between 6 and 40 characters.",
        (val) =>
          val && val.toString().length >= 6 && val.toString().length <= 40
      )
      .required("This field is required!"),
  });

  // Xử lý sự kiện khi người dùng nhấn nút đăng ký
  const handleRegister = (formValue) => {
    setSuccessful(false);

    // Gửi action đăng ký đến Redux store
    dispatch(register(formValue))
      .unwrap()
      .then(() => {
        setSuccessful(true);
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  useEffect(() => {
    setMessage(error);
  }, [error]);

  return (
    <div className="col-md-12 signup-form">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleRegister}
        >
          {({ handleChange, values }) => (
            <Form>
              {!successful && (
                <div>
                  <div className="form-group">
                    <label htmlFor="firstName">Firstname</label>
                    <Field
                      name="firstName"
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setMessage("");
                      }}
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Lastname</label>
                    <Field
                      name="lastName"
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        handleChange(e);
                        setMessage("");
                      }}
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <Field
                      name="username"
                      type="text"
                      className="form-control"
                      onChange={(e) => {
                        setMessage("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage
                      name="username"
                      component="div"
                      className="alert alert-danger"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <Field
                      name="email"
                      type="email"
                      className="form-control"
                      onChange={(e) => {
                        setMessage("");
                        handleChange(e);
                      }}
                    />
                    <ErrorMessage
                      name="email"
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
                    <button type="submit" className="btn btn-primary btn-block">
                      Sign Up
                    </button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </div>

      {message && (
        <div className="form-group">
          <div
            className={
              successful ? "alert alert-success" : "alert alert-danger"
            }
            role="alert"
          >
            {message}
          </div>
          <Row>
            <Col>
              <button className="order__btn d-flex align-items-center justify-content-between ">
                <Link to="/login">
                  <i className="ri-arrow-left-s-line"></i>Login
                </Link>
              </button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Register;
