import React, { useState } from "react";
import "./Cart.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "../CartItem/CartItem";
import { useDispatch, useSelector } from "react-redux";
import { initializeCart, selectCart } from "../../redux/slices/cartSlice";
import productApi from "../../api/productApi";
import auth from "../../auth/auth";
import { showShippingRoute } from "../../redux/slices/utilsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Cart() {
  const { cartItems, itemsCount, total } = useSelector(selectCart);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [btnDisable, setBtnDisable] = useState(false);
  useEffect(() => {
    dispatch(initializeCart());
  }, []);

  const handleClick = async () => {
    if (pathname === "/shippingAddress") {
      closeCart();
    }
    if (!auth.isLoggedIn()) {
      return (window.location.href = "http://localhost:3000/");
    }
    setIsLoading(true);
    try {
      setBtnDisable(true);
      let checkoutUrl = await productApi.checkout(cartItems);
      if (checkoutUrl) {
        localStorage.setItem("payment_success", "true");
        setBtnDisable(false);
        dispatch(showShippingRoute());
        setIsLoading(false);
        closeCart();
        navigate("/shippingAddress", { state: { checkoutUrl }, replace: true });
      }
    } catch (error) {
      setBtnDisable(false);
      setIsLoading(false);
      alert("something went wrong");
    }
  };

  return (
    <div id="cart" className="cart-container">
      <div className="cart">
        <div className="cart-header">
          <span>Cart</span>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={closeCart}
            className="close-icon"
            icon={faClose}
          />
        </div>
        {itemsCount > 0 ? (
          <>
            <ul className="cart-body">
              {cartItems.map((item) => {
                return (
                  <React.Fragment key={item._id}>
                    <CartItem item={item} />
                  </React.Fragment>
                );
              })}
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Total: ${total}
              </p>
            </ul>
            <button
              disabled={btnDisable}
              style={{
                cursor: btnDisable ? "not-allowed" : "pointer",
                backgroundColor: btnDisable ? "gray" : "var(--green)",
              }}
              onClick={handleClick}
              className="btn"
            >
              {isLoading ? "Loading..." : "Checkout"}
            </button>
          </>
        ) : (
          <p className="cart-empty">Cart is empty</p>
        )}
      </div>
    </div>
  );
}
function closeCart() {
  let cart = document.getElementById("cart");
  let body = document.body.style;
  body.overflow = "auto";
  cart.style.display = "none";
}
