import { Navigate } from "react-router-dom";
import auth from "../../auth/auth";

const ProtectedRoute = ({ children, routeName }) => {
  let isLoggedIn = auth.isLoggedIn();

  if (
    (!isLoggedIn && routeName !== "signup") ||
    (isLoggedIn && routeName === "signup")
  ) {
    return <Navigate replace={true} to="/myaccount" />;
  }
  return children;
};

export default ProtectedRoute;
