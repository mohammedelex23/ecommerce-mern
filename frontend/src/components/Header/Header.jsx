import "./Header.css";
import {
  faArrowRightFromBracket,
  faBars,
  faShoppingCart,
  faUser,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import { Link, useLocation } from "react-router-dom";
import auth from "../../auth/auth";
import Cart from "../Cart/Cart";
export default function Header() {
  const { pathname } = useLocation();

  const { itemsCount } = useSelector(selectCart);
  const user = auth.getLocalUser();

  return (
    <div className="header">
      <Cart />

      <SideSlider />

      <h1 className="logo">
        <Link to="/">
          <img src="/images/herba_logo.png" alt="logo" />
        </Link>
      </h1>

      <div className="wrapper">
        {user && user.isAdmin && pathname !== "/dashboard" && (
          <Link className="dashboard-link" to="/dashboard">
            Dashboard
          </Link>
        )}

        <Link to="/myaccount">
          <FontAwesomeIcon className="icon" icon={faUser} />
        </Link>

        {/* cart icon */}
        {pathname !== "/shippingAddress" && !user?.isAdmin && (
          <span
            className="cart-icon"
            onClick={openCart}
            style={{ position: "relative", cursor: "pointer" }}
          >
            <FontAwesomeIcon className="icon" icon={faShoppingCart} />
            <span className="cart-counter">{itemsCount}</span>
          </span>
        )}
        <FontAwesomeIcon
          onClick={openSidenav}
          style={{ cursor: "pointer" }}
          size="lg"
          icon={faBars}
        />
      </div>
    </div>
  );
}

function SideSlider() {
  return (
    <div id="sidenav" className="side-box">
      <div className="side-slider">
        <FontAwesomeIcon
          onClick={closeSidenav}
          className="side-exit-icon"
          icon={faX}
        />
        <div className="menu-links">
          <h3 className="title">Herba care</h3>
          <ul className="links">
            <li>
              <Link>Home</Link>
            </li>
            <li>
              <Link>Orders</Link>
            </li>
            <li>
              <Link>favorites</Link>
            </li>
          </ul>
        </div>
        {/* categories */}
        {/* <div className="cats">
          <h3 className="title">CATEGORIES</h3>
          <ul className="links">
            <li>
              <Link>supplements</Link>
            </li>
            <li>
              <Link>men</Link>
            </li>
            <li>
              <Link>top sellers</Link>
            </li>
          </ul>
        </div> */}
        {/* social */}
        {/* <div className="social">
          <h3 className="title">SOCIAL</h3>
          <ul>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a href="">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}

function openCart() {
  document.getElementById("cart").style.display = "block";
  document.body.style.overflow = "hidden";
}

function openSidenav() {
  document.getElementById("sidenav").style.width = "100vw";
}
function closeSidenav() {
  document.getElementById("sidenav").style.width = "0";
}
