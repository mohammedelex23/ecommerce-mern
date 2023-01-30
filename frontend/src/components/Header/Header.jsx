import "./Header.css";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import { Link, useLocation } from "react-router-dom";
import auth from "../../auth/auth";
export default function Header() {
  const { pathname } = useLocation();

  const { itemsCount } = useSelector(selectCart);
  const logout = function () {
    auth.logout();
    window.location.href = "/";
  };
  return (
    <div className="header">
      {pathname === "/dashboard" ? (
        <h1 className="logo">
          <Link to="/">Dashboard</Link>
        </h1>
      ) : (
        <h1 className="logo">
          <Link to="/">Ecommerce</Link>
        </h1>
      )}

      <div className="wrapper">
        {pathname !== "/dashboard" && (
          <span
            onClick={openCart}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <FontAwesomeIcon className="icon" icon={faShoppingCart} />
            <span className="cart-counter">{itemsCount}</span>
          </span>
        )}

        {auth.isAuthenticated() ? (
          <>
            {pathname === "/dashboard" && (
              <span style={{ marginRight: "7px", userSelect: "none" }}>
                Admin
              </span>
            )}
            <FontAwesomeIcon
              onClick={toggleLogout}
              className="icon"
              icon={faUser}
            />
          </>
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
