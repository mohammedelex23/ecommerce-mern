import "./ProductRow.css";
import configs from "../../configs";
import EditProductForm from "../EditProductForm/EditProductForm";
import { useState } from "react";
import VeiwProduct from "../VeiwProduct/VeiwProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
import ReactDOM from "react-dom";
export default function ProductRow({ product, deleteProduct, editProduct }) {
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showVeiwProduct, setShowVeiwProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [imageUpdateDate, setImageUpdateDate] = useState("");

  const updateImageDate = () => {
    setImageUpdateDate(Date.now());
  };

  const handleView = function () {
    setShowVeiwProduct(true);
    document.body.style.overflow = "hidden";
  };
  const hideVeiwProduct = function () {
    setShowVeiwProduct(false);
    document.body.style.overflow = "auto";
  };
  const handleEdit = function () {
    document.body.style.overflow = "hidden";
    setShowEditProductForm(true);
  };
  const hideEditProduct = function () {
    document.body.style.overflow = "auto";
    setShowEditProductForm(false);
  };

  const handleDelete = function () {
    document.body.style.overflow = "hidden";
    setShowDeleteProduct(true);
  };
  const hideDeleteProduct = function () {
    document.body.style.overflow = "auto";
    setShowDeleteProduct(false);
  };

  return (
    <>
      <tr className="product-row">
        <td>{product._id}</td>
        <td className="product-width">
          <div>
            <img
              className="product-img"
              src={`${configs.BASE_URL}/products/${product._id}/image?imageUpdateDate=${imageUpdateDate}`}
              alt="product"
            />
            <div className="product-details">
              <span>{product.name}</span>
              <span>${product.price}</span>
            </div>
          </div>
        </td>
        <td>
          <button onClick={handleView} className="row-btn btn-view">
            View
          </button>
          <button onClick={handleEdit} className="row-btn btn-edit">
            Edit
          </button>
          <button onClick={handleDelete} className="row-btn btn-delete">
            Delete
          </button>
        </td>
      </tr>

      {showEditProductForm &&
        ReactDOM.createPortal(
          <EditProductForm
            hideEditProduct={hideEditProduct}
            key={product._id}
            product={product}
            editProduct={editProduct}
            updateImageDate={updateImageDate}
          />,
          document.body
        )}
      {showVeiwProduct &&
        ReactDOM.createPortal(
          <VeiwProduct
            hideVeiwProduct={hideVeiwProduct}
            key={product._id}
            product={product}
          />,
          document.body
        )}
      {showDeleteProduct &&
        ReactDOM.createPortal(
          <DeleteProduct
            productId={product._id}
            productName={product.name}
            key={product._id}
            hideDeleteProduct={hideDeleteProduct}
            deleteProduct={deleteProduct}
          />,
          document.body
        )}
    </>
  );
}
