import "./Product.css";
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import configs from "../../configs";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  selectItemInCart,
} from "../../redux/slices/cartSlice";
import auth from "../../auth/auth";
export default function Product({ product }) {
  const dispatch = useDispatch();
  const inCart = useSelector(selectItemInCart(product._id));
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (type) => () => {
    if (type === "add") {
      let isAuthenticated = auth.isAuthenticated();
      if (!isAuthenticated) {
        return navigate("/myaccount", { state: pathname });
      }
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  return (
    <div className="product">
      <Link state={{ productId: product._id }} to={`/products/${product._id}`}>
        <img
          className="product-img"
          src={`${configs.BASE_URL}/products/${product._id}/image`}
          alt="product"
        />
      </Link>
      <div className="product-desc">
        <div className="name-price">
          <h5>{product.name}</h5>
          <span>${product.price}</span>
        </div>
        <span className="desc">{product.description}</span>
        {!inCart ? (
          <button onClick={handleClick("add")} className=" add">
            Add to Cart
          </button>
        ) : (
          <button onClick={handleClick("remove")} className=" remove">
            remove
          </button>
        )}
      </div>
    </div>
  );
}
