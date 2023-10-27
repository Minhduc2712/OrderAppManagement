import { useSelector } from "react-redux";
import { selectlistUser } from "../Redux/Selector/UserSelector";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAdmin: admin } = useSelector(selectlistUser);
  console.log("isAdmin", admin);
  if (!admin) {
    return <Navigate to="/" />;
  }
  return children;
};
