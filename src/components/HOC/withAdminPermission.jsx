import React from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"; // Import the jwt_decode library
import Cookies from "js-cookie"; // Import the Cookies library
import Alert from "@mui/material/Alert";

const withAdminPermission = (Component) => {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    const jwtToken = Cookies.get("userPayload"); // Get the JWT token from Cookies

    const isAdmin = () => {
      if (!jwtToken) return false;
      const decodedToken = jwt_decode(jwtToken);
      const isAdmin = decodedToken.roles.includes("ROLE_ADMIN");
      console.log("isAdmin", isAdmin);
      return isAdmin;
    };

    const userHasAdminPermissions = isAdmin();

    if (!userHasAdminPermissions) {
      navigate("/login");
      return (
        <Alert severity="error">This is an error alert — check it out!</Alert>
      );
    }

    return <Component {...props} />;
  };
};

export default withAdminPermission;
