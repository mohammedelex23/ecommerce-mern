import "./Header.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import { selectCart, fillCartItems } from "../../redux/slices/cartSlice";
import { useEffect } from "react";
import productApi from "../../api/productApi";
import { Link } from "react-router-dom";
import auth from "../../auth/auth";
export default function Header() {
  const dispatch = useDispatch();

  useEffect(() => {
    let cart = localStorage.getItem("cart");
    if (cart) {
      cart = JSON.parse(cart);

      dispatch(fillCartItems(cart));
    } else {
      productApi.getProducts().then((products) => {
        dispatch(fillCartItems(products));
      });
    }
  }, []);

  const { itemsCount } = useSelector(selectCart);
  const logout = function () {
    auth.logout();
    window.location.href = "/";
  };
  return (
    <div className="header">
      <h1 className="logo">
        <Link to="/">Ecommerce</Link>
      </h1>
      <div className="wrapper">
        <span
          onClick={openCart}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <FontAwesomeIcon className="icon" icon={faShoppingCart} />
          <span className="cart-counter">{itemsCount}</span>
        </span>

        {auth.isAuthenticated() ? (
          <FontAwesomeIcon
            onClick={toggleLogout}
            className="icon"
            icon={faUser}
          />
        ) : (
          <Link className="login-link" to="/login">
            Login
          </Link>
        )}
        <div id="logout" className="logout">
          <span onClick={logout}>Logout</span>
        </div>
      </div>
    </div>
  );
}

function openCart() {
  document.getElementById("cart").style.display = "block";
  document.body.style.overflow = "hidden";
}

function toggleLogout() {
  let logout = document.getElementById("logout");
  logout.style.display === "block"
    ? (logout.style.display = "none")
    : (logout.style.display = "block");
}
