import "./AddProductForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import useAddProductForm from "../../hooks/useAddProductForm";
import ErrorComp from "../ErrorComp/ErrorComp";
import productApi from "../../api/productApi";
import { useState } from "react";
import { useEffect } from "react";
export default function AddProductForm({ AddProducts }) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const {
    values,
    nameError,
    imageError,
    priceError,
    descriptioncError,
    handleBlur,
    handleChange,
    isFormValid,
    clearForm: clearFormState,
  } = useAddProductForm();

  const handleSubmit = async function (e) {
    e.preventDefault();
    let isValid = isFormValid();

    if (!isValid || nameError || descriptioncError || priceError || imageError)
      return;

    setError("");

    let { name, price, description, image } = values;
    name = name.trim();
    description = description.trim();
    price = parseInt(price);
    let form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);
    form.append("image", image);

    try {
      let product = await productApi.createProduct(form);
      AddProducts(product);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      clearFormState(["name", "description", "price", "image"]);
      document.getElementsByTagName("form")[0].reset();
    } catch (error) {
      setError(error?.message || "something went wrong");
    }
  };

  const toggleAddProductModal = function () {
    setShowSuccess(false);
    document.getElementById("add-product-wrapper").style.display = "none";
    setError("");
  };
  return (
    <div id="add-product-wrapper" className="product-form-wrapper">
      <div className="product-form">
        <form enctype="multipart/form-data" onSubmit={handleSubmit}>
          <div className="form-title">
            <h4>New Product</h4>

            <FontAwesomeIcon
              onClick={toggleAddProductModal}
              className="exit-icon"
              icon={faRemove}
            />
          </div>
          {error && <ErrorComp error={error} />}
          {showSuccess && (
            <div className="success-message">Successfully created</div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              type="text"
              placeholder="Unique name"
            />
            {nameError && <ErrorComp error={nameError} />}
          </div>

          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <textarea
              onChange={handleChange("description")}
              onBlur={handleBlur("description")}
              rows={4}
              placeholder="Product description"
            />
            {descriptioncError && <ErrorComp error={descriptioncError} />}
          </div>
          <div>
            <label className="price" htmlFor="price">
              Price
            </label>
            <input
              onChange={handleChange("price")}
              onBlur={handleBlur("price")}
              className="input-price"
              type="number"
              min={1}
            />
            {priceError && <ErrorComp error={priceError} />}
          </div>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input onChange={handleChange("image")} type="file" />
            {imageError && <ErrorComp error={imageError} />}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
