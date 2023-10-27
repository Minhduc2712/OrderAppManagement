import { useSelector } from "react-redux";
import { selectlistUser } from "../Redux/Selector/UserSelector";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  const { isAdmin: isAdmin } = useSelector(selectlistUser);
  console.log("isAdmin", isAdmin);
  if (!isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};
