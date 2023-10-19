import "./normalize.css";
import "./Main.css";
import Header from "../Header/Header";
import Welcome from "../Welcome/Welcome";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ProductDescription from "../ProductDescription/ProductDescription";
import Success from "../Success/Success";
import Dashboard from "../Dashboard/Dashboard";
import VerifyAccount from "../VerifyAccount/VerifyAccount";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import MyAccount from "../MyAccount/MyAccount";
import Signup from "../Signup/Signup";
import Home from "../Home/Home";
import LogoutSuccess from "../LogoutSuccess/LogoutSuccess";
import SignupSuccess from "../SignupSuccess/SignupSuccess";
import ShippingAddress from "../ShippingAddress/ShippingAddress";
import UpdateAccount from "../UpdateAccount/UpdateAccount";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Welcome />
        <Home />
      </>
    ),
  },
  {
    path: "/myaccount",
    element: (
      <>
        <Header />
        <MyAccount />
      </>
    ),
  },
  {
    path: "/updateAccount",
    element: (
      <ProtectedRoute>
        <Header />
        <UpdateAccount />
      </ProtectedRoute>
    ),
  },
  {
    path: "/shippingAddress",
    element: (
      <>
        <Header />
        <ShippingAddress />
      </>
    ),
  },
  {
    path: "/signup",
    element: (
      <ProtectedRoute routeName="signup">
        <Header />
        <Signup />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signupSuccess",
    element: (
      <>
        <Header />
        <SignupSuccess />
      </>
    ),
  },
  {
    path: "/logoutSuccess",
    element: (
      <>
        <Header />
        <LogoutSuccess />
      </>
    ),
  },
  {
    path: "/products/:id",
    element: (
      <>
        <Header />
        <ProductDescription />
      </>
    ),
  },
  {
    path: "/success",
    element: <Success />,
  },

  {
    path: "/verify_account",
    element: (
      <>
        {/* <Header /> */}
        <VerifyAccount />
      </>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <>
        <Header />
        <Dashboard />
      </>
    ),
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "*",
    element: (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>404 NOT Found</h1>
        <p>this route is not found</p>
        <div style={{ marginBottom: "10px" }}>
          <Link to={-1}>return</Link>
        </div>

        <Link to="/" replace>
          go to home
        </Link>
      </div>
    ),
  },
]);

export default function Main() {
  return (
    <div className="main">
      <RouterProvider router={router} />
      <footer>&copy; all rights reserved</footer>
    </div>
  );
}
