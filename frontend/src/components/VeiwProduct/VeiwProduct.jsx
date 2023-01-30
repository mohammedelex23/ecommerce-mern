import "./VeiwProduct.css";
import configs from "../../configs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
export default function VeiwProduct({ product, hideVeiwProduct }) {
  return (
    <div
      id="veiw-product"
      style={{ display: "block" }}
      className="product-form-wrapper"
    >
      <div className="product-form">
        <div className="exit-icon-container">
          <FontAwesomeIcon
            onClick={hideVeiwProduct}
            className="exit-icon"
            icon={faRemove}
          />
        </div>
        <img
          className="product-img"
          src={`${configs.BASE_URL}/api/products/${product._id}/image`}
          alt=""
        />
        <div className="product-info">
          <span>Name: </span>
          <span>{product.name}</span>
        </div>
        <div className="product-info">
          <span>Price: </span>
          <span>${product.price}</span>
        </div>
        <div className="product-info">
          <span>Description: </span>
          <span>{product.description}</span>
        </div>
      </div>
    </div>
  );
}
