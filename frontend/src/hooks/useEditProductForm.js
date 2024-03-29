import { useState } from "react";
import formValidator from "../utils/formValidator";

export default function useEditProductForm() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    image: null, // e.target.files[0] if undefined
  });

  const [nameError, setNameError] = useState("");
  const [descriptioncError, setDescriptioncError] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");

  const handleChange = (field) => (e) => {
    let value = e.target.value;

    if (field === "name") {
      validateName(value);
    } else if (field === "description") {
      validateDescription(value);
    } else if (field === "price") {
      validatePrice(value);
    } else if (field === "image") {
      validateImage(e.target.files[0]);
    }
    if (field === "image") setValues({ ...values, image: e.target.files[0] });
    else setValues({ ...values, [field]: value });
  };
  const handleBlur = (field) => (e) => {
    let value = e.target.value;
    if (field === "name") {
      validateName(value);
    } else if (field === "description") {
      validateDescription(value);
    } else if (field === "price") {
      validatePrice(value);
    }
  };

  const isFormValid = function (includeInputFile) {
    let { error: nameError } = formValidator.validateName(values.name);
    let { error: priceError } = formValidator.validatePrice(values.price);
    let { error: imageError } = formValidator.validateImage(values.image);
    let { error: descriptioncError } = formValidator.validateFormField(
      "description",
      values.description
    );

    validateName(values.name);
    validateDescription(values.description);
    validatePrice(values.price);

    if (includeInputFile) {
      validateImage(values.image);
    }

    if (includeInputFile)
      return !(nameError || descriptioncError || priceError || imageError);
    else return !(nameError || descriptioncError || priceError);
  };

  function validateName(name) {
    let { error, message } = formValidator.validateName(name);
    if (error) {
      setNameError(message);
    } else {
      setNameError("");
    }
  }
  function validateDescription(desc) {
    let { error, message } = formValidator.validateFormField(
      "description",
      desc
    );
    if (error) {
      setDescriptioncError(message);
    } else {
      setDescriptioncError("");
    }
  }
  function validateImage(image) {
    let { error, message } = formValidator.validateImage(image);

    if (error) {
      setImageError(message);
    } else {
      setImageError("");
    }
  }
  function validatePrice(price) {
    let { error, message } = formValidator.validatePrice(price);
    if (error) {
      setPriceError(message);
    } else {
      setPriceError("");
    }
  }
  function clearForm(fields = []) {
    let temp = {};
    fields.forEach((field) => {
      temp[field] = "";
    });
    setValues({ ...values, ...temp });
  }
  function fillForm(fields = []) {
    let temp = {};
    fields.forEach((field) => {
      temp[field.name] = field.value;
    });
    setValues({ ...values, ...temp });
  }

  return {
    values,
    nameError,
    setNameError,
    imageError,
    setImageError,
    priceError,
    descriptioncError,
    handleBlur,
    handleChange,
    isFormValid,
    clearForm,
    fillForm,
  };
}
