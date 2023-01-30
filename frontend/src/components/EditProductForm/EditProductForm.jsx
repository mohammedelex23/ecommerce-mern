import "./EditProductForm.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRemove } from "@fortawesome/free-solid-svg-icons";
import useEditProductForm from "../../hooks/useEditProductForm";
import ErrorComp from "../ErrorComp/ErrorComp";
import productApi from "../../api/productApi";
import { useState } from "react";
import { useEffect } from "react";
export default function EditProductForm({
  product,
  hideEditProduct,
  editProduct,
}) {
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");
  const [changeProductImage, setChangeProductImage] = useState(false);

  const {
    values,
    nameError,
    imageError,
    setImageError,
    priceError,
    descriptioncError,
    handleBlur,
    handleChange,
    isFormValid,
    clearForm: clearFormState,
    fillForm,
  } = useEditProductForm();

  useEffect(() => {
    fillForm([
      {
        name: "name",
        value: product.name,
      },
      {
        name: "price",
        value: String(product.price),
      },
      {
        name: "description",
        value: product.description,
      },
    ]);
  }, []);
  const hideInputFile = function () {
    setChangeProductImage(!changeProductImage);
    setImageError("");
  };
  const showInputFile = function () {
    setChangeProductImage(!changeProductImage);
  };
  const handleSubmit = async function (e) {
    e.preventDefault();
    let isValid = isFormValid(changeProductImage);

    if (changeProductImage) {
      if (
        !isValid ||
        nameError ||
        descriptioncError ||
        priceError ||
        imageError
      )
        return;
    } else {
      if (!isValid || nameError || descriptioncError || priceError) return;
    }

    setError("");

    let { name, price, description, image } = values;
    name = name.trim();
    description = description.trim();
    price = parseInt(price);
    let form = new FormData();
    form.append("name", name);
    form.append("description", description);
    form.append("price", price);

    if (changeProductImage) form.append("image", image);

    try {
      let res = await productApi.updateProduct(form, product._id);
      console.log(res.image);

      editProduct(res);
      setShowSuccess(true);

      // update dashboard products list by pushing the response

      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);
      // clearFormState(["name", "description", "price", "image"]);
      // document.getElementsByTagName("form")[0].reset();
    } catch (error) {
      setError(error?.message || "something went wrong");
    }
  };

  const hideEditProductModal = function () {
    setShowSuccess(false);
    setError("");
    hideEditProduct();
  };
  return (
    <div
      style={{ display: "block" }}
      id="edit-product-wrapper"
      className="product-form-wrapper"
    >
      <div className="product-form">
        <form onSubmit={handleSubmit}>
          <div className="form-title">
            <h4>Edit Product</h4>

            <FontAwesomeIcon
              onClick={hideEditProductModal}
              className="exit-icon"
              icon={faRemove}
            />
          </div>
          {error && <ErrorComp error={error} />}
          {showSuccess && (
            <div className="success-message">Successfully updated</div>
          )}
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              value={values.name}
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
              value={values.description}
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
              value={values.price}
              onChange={handleChange("price")}
              onBlur={handleBlur("price")}
              className="input-price"
              type="number"
              min={1}
            />
            {priceError && <ErrorComp error={priceError} />}
          </div>
          <div className="form-group">
            {changeProductImage ? (
              <>
                <label htmlFor="image">Image</label>
                <input onChange={handleChange("image")} type="file" />
                <span onClick={hideInputFile} className="input-file">
                  Hide input file
                </span>
                {imageError && <ErrorComp error={imageError} />}
              </>
            ) : (
              <span className="input-file" onClick={showInputFile}>
                Change product image
              </span>
            )}
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
