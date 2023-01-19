import "./normalize.css";
import "./Main.css";
import Header from "../Header/Header";
import Cart from "../Cart/Cart";
import Welcome from "../Welcome/Welcome";
import ProductsList from "../ProductsList/ProductsList";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductDescription from "../ProductDescription/ProductDescription";
import Success from "../Success/Success";
import Login from "../Login/Login";
import Register from "../Register/Register";
import RegisterSuccess from "../SignupSuccess/RegisterSuccess";

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
]);

export default function Main() {
  return (
    <div className="container">
      <Cart enableDrag={true} />
      <RouterProvider router={router} />
    </div>
  );
}
