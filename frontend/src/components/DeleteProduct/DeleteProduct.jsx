import "./DeleteProduct.css";
import productApi from "../../api/productApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
export default function DeleteProduct({
  hideDeleteProduct,
  productId,
  productName,
  deleteProduct,
}) {
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const handleDelete = async function () {
    try {
      let res = await productApi.deleteProduct(productId);
      setDeleteSuccess(true);

      deleteProduct(productId);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{ display: "block" }}
      className="product-form-wrapper delete-product"
    >
      <div className="product-form">
        <p>
          Are you sure you want to delete <strong>({productName})</strong>
        </p>
        <div>
          <button onClick={hideDeleteProduct}>Cancel</button>
          {!deleteSuccess ? (
            <button onClick={handleDelete}>Confirm</button>
          ) : (
            <button
              disabled
              style={{
                backgroundColor: "green",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              Done
              <FontAwesomeIcon icon={faCheck} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
