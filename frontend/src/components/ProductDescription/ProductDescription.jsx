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
  selectItemInCart,
  selectItemQty,
} from "../../redux/slices/cartSlice";
import auth from "../../auth/auth";

export default function ProductDescription() {
  const { state, pathname } = useLocation();

  const { data: product, isError, isLoading, error } = useApi(
    `${configs.BASE_URL}/api/products/${state?.productId}`
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inCart = useSelector(selectItemInCart(product._id));
  const qty = useSelector(selectItemQty(product._id));

  const handleClick = (type) => () => {
    if (type === "add") {
      let isAuthenticated = auth.isAuthenticated();
      if (!isAuthenticated) {
        return navigate("/login", { state: { pathname, state } });
      }
      dispatch(addToCart(product));
    } else {
      dispatch(removeFromCart(product._id));
    }
  };

  const handleQty = (type) => () => {
    if (type === "increase") {
      dispatch(increaseQty(product));
    } else {
      dispatch(decreaseQty(product._id));
    }
  };

  if (!state) {
    return <Navigate to="/" replace={true} />;
  }

  if (error) {
    return <Navigate to="/" replace />;
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
                  <span>{qty || 1}</span>
                  <FontAwesomeIcon
                    style={{ cursor: "pointer" }}
                    onClick={handleQty("increase")}
                    icon={faPlus}
                  />
                </div>
              </div>
              {!inCart ? (
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
