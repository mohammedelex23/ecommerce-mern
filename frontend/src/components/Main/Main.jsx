import "./normalize.css";
import "./Main.css";
import Header from "../Header/Header";
import Cart from "../Cart/Cart";
import Welcome from "../Welcome/Welcome";
import ProductsList from "../ProductsList/ProductsList";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import ProductDescription from "../ProductDescription/ProductDescription";
import Success from "../Success/Success";
import Login from "../Login/Login";
import Register from "../Register/Register";
import RegisterSuccess from "../SignupSuccess/RegisterSuccess";
import Dashboard from "../Dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Welcome />
        <ProductsList />
      </>
    ),
  },
  {
    path: "/product",
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
    path: "/login",
    element: (
      <>
        <Header />
        <Login />
      </>
    ),
  },
  {
    path: "/register",
    element: (
      <>
        <Header />
        <Register />
      </>
    ),
  },
  {
    path: "/registeration_success",
    element: (
      <>
        {/* <Header /> */}
        <RegisterSuccess />
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
    path: "*",
    element: (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>404 NOT Found</h1>
        <p>this route is not found</p>
        <Link to="/" replace>
          go to home
        </Link>
      </div>
    ),
  },
]);

export default function Main() {
  return (
    <div className="container">
      <Cart />
      <RouterProvider router={router} />
    </div>
  );
}
