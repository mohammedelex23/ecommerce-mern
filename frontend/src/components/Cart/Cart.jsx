import React, { useState } from "react";
import "./Cart.css";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItem from "../CartItem/CartItem";
import { useSelector } from "react-redux";
import { selectCart } from "../../redux/slices/cartSlice";
import productApi from "../../api/productApi";
import auth from "../../auth/auth";

export default function Cart() {
  const { cartItems, itemsCount, total } = useSelector(selectCart);
  const [btnDisable, setBtnDisable] = useState(false);
  const handleClick = async () => {
    if (!auth.isAuthenticated()) {
      return (window.location.href = "http://localhost:3000/");
    }
    try {
      let cart = cartItems.filter((item) => item.inCart);
      setBtnDisable(true);
      let url = await productApi.checkout(cart);
      if (url) {
        localStorage.setItem("payment_success", "true");
        setBtnDisable(false);

        window.location.href = url;
      }
    } catch (error) {
      setBtnDisable(false);

      console.log(error);
    }
  };

  return (
    <div onClick={closeCart("cart")} id="cart" className="cart-container">
      <div id="cart-content" className="cart">
        <div className="cart-header">
          <span>Cart</span>
          <FontAwesomeIcon
            style={{ cursor: "pointer" }}
            onClick={closeCart("icon")}
            className="close-icon"
            icon={faClose}
          />
        </div>
        {itemsCount > 0 ? (
          <>
            <ul className="cart-body">
              {cartItems?.map((item) => {
                if (item.inCart) {
                  return (
                    <React.Fragment key={item._id}>
                      <CartItem item={item} />
                    </React.Fragment>
                  );
                } else return null;
              })}
              <p style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                Total: ${total}
              </p>
            </ul>
            <button disabled={btnDisable} onClick={handleClick} className="btn">
              Checkout
            </button>
          </>
        ) : (
          <p className="cart-empty">Cart is empty</p>
        )}
      </div>
    </div>
  );
}
function closeCart(name) {
  return (e) => {
    let cart = document.getElementById("cart");
    let body = document.body.style;

    if (name === "icon") {
      body.overflow = "auto";
      cart.style.display = "none";
    } else {
      if (e.target === cart) {
        body.overflow = "auto";
        cart.style.display = "none";
      }
    }
  };
}
