import "./ProductDescription.css";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import useApi from "../../hooks/useApi";
import configs from "../../configs";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
  slelectProduct,
} from "../../redux/slices/cartSlice";
import auth from "../../auth/auth";

export default function ProductDescription() {
  const { state, pathname } = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const product = useSelector(slelectProduct(state?.productId));

  const handleClick = (type) => () => {
    if (type === "add") {
      let isAuthenticated = auth.isAuthenticated();
      if (!isAuthenticated) {
        return navigate("/login", { state: { pathname, state } });
      }
      dispatch(addToCart(product._id));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  const handleQty = (type) => () => {
    if (type === "increase") {
      dispatch(increaseQty(product._id));
    } else {
      dispatch(decreaseQty(product._id));
    }
  };

  if (!state) {
    return <Navigate to="/" replace={true} />;
  }

  return (
    <div className="product-desc-wrapper">
      {state && product && (
        <>
          <div className="product-description">
            {/* product img */}
            <div className="img-wrapper">
              <img
                src={`${configs.BASE_URL}/api/products/${state.productId}/image`}
                alt="product"
              />
            </div>
            {/* product desc */}
            <div className="product-desc">
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="price-plus-minus">
                <span>${product.price}</span>
                <div>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleQty()}
                    icon={faMinus}
                  />
                  <span>{product.qty}</span>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleQty("increase")}
                    icon={faPlus}
                  />
                </div>
              </div>
              {!product.inCart ? (
                <button onClick={handleClick("add")} className="btn add">
                  Add to Cart
                </button>
              ) : (
                <button onClick={handleClick("remove")} className="btn remove">
                  remove
                </button>
              )}
            </div>
          </div>
          <div className="return-home">
            <FontAwesomeIcon icon={faArrowLeft} />
            <Link className="link" to="/">
              Continue shopping
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
