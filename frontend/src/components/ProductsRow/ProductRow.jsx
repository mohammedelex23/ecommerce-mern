import "./ProductRow.css";
import configs from "../../configs";
import EditProductForm from "../EditProductForm/EditProductForm";
import { useState } from "react";
import VeiwProduct from "../VeiwProduct/VeiwProduct";
import DeleteProduct from "../DeleteProduct/DeleteProduct";
export default function ProductRow({ product, deleteProduct, editProduct }) {
  const [showEditProductForm, setShowEditProductForm] = useState(false);
  const [showVeiwProduct, setShowVeiwProduct] = useState(false);
  const [showDeleteProduct, setShowDeleteProduct] = useState(false);

  const handleView = function () {
    setShowVeiwProduct(true);
  };
  const hideVeiwProduct = function () {
    setShowVeiwProduct(false);
  };
  const handleEdit = function () {
    setShowEditProductForm(true);
  };
  const hideEditProduct = function () {
    setShowEditProductForm(false);
  };

  const handleDelete = function () {
    setShowDeleteProduct(true);
  };
  const hideDeleteProduct = function () {
    setShowDeleteProduct(false);
  };

  return (
    <>
      <tr className="product-row">
        <td>{product._id}</td>
        <td>
          <div>
            <img
              className="product-img"
              src={`${configs.BASE_URL}/api/products/${product._id}/image?image=${product.image}`}
              alt="product"
            />
            <span>{product.name}</span>
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
      {showEditProductForm && (
        <EditProductForm
          hideEditProduct={hideEditProduct}
          key={product._id}
          product={product}
          editProduct={editProduct}
        />
      )}
      {showVeiwProduct && (
        <VeiwProduct
          hideVeiwProduct={hideVeiwProduct}
          key={product._id}
          product={product}
        />
      )}
      {showDeleteProduct && (
        <DeleteProduct
          productId={product._id}
          productName={product.name}
          key={product._id}
          hideDeleteProduct={hideDeleteProduct}
          deleteProduct={deleteProduct}
        />
      )}
    </>
  );
}
