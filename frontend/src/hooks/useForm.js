import { useState } from "react";
import formValidator from "../utils/formValidator";

export default function useForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    desc: "",
    price: "",
    image: null, // e.target.files[0] if undefined
  });

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

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [descError, setDescError] = useState("");
  const [imageError, setImageError] = useState("");
  const [priceError, setPriceError] = useState("");

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "name") {
      validateName(value);
    } else if (field === "confirmPassword") {
      validateConfirmPassword(values.password, value);
    } else if (field === "desc") {
      validateDesc(value);
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
    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "name") {
      validateName(value);
    } else if (field === "desc") {
      validateDesc(value);
    } else if (field === "price") {
      validatePrice(value);
    }
  };

  const isFormValid = function (type) {
    if (type === "create-product") {
      let { error: nameError } = formValidator.validateName(values.name);
      let { error: descError } = formValidator.validateDesc(values.desc);
      let { error: priceError } = formValidator.validatePrice(values.price);
      let { error: imageError } = formValidator.validateImage(values.image);

      validateName(values.name);
      validateDesc(values.desc);
      validatePrice(values.price);
      validateImage(values.image);

      return nameError || descError || priceError || imageError;
    }
    if (type === "edit-product") {
      let { error: nameError } = formValidator.validateName(values.name);
      let { error: descError } = formValidator.validateDesc(values.desc);
      let { error: priceError } = formValidator.validatePrice(values.price);

      validateName(values.name);
      validateDesc(values.desc);
      validatePrice(values.price);

      return nameError || descError || priceError;
    }

    let { error: emailError } = formValidator.validateEmail(values.email);
    let { error: passwordError } = formValidator.validatePassword(
      values.password
    );

    validateEmail(values.email);
    validatePassword(values.password);
    validateName(values.name);

    validateDesc(values.desc);
    validatePrice(values.price);
    validateImage(values.image);
  };
  function validateEmail(email) {
    let { error, message } = formValidator.validateEmail(email);
    if (error) {
      setEmailError(message);
    } else {
      setEmailError("");
    }
  }
  function validatePassword(password) {
    let { error, message } = formValidator.validatePassword(password);
    if (error) {
      setPasswordError(message);
    } else {
      validateConfirmPassword(password, values.confirmPassword);
      setPasswordError("");
    }
  }
  function validateName(name) {
    let { error, message } = formValidator.validateName(name);
    if (error) {
      setNameError(message);
    } else {
      setNameError("");
    }
  }
  function validateDesc(desc) {
    let { error, message } = formValidator.validateDesc(desc);
    if (error) {
      setDescError(message);
    } else {
      setDescError("");
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
  function validateConfirmPassword(password, confirmPassword) {
    let { error, message } = formValidator.validateConfirmPassword(
      password,
      confirmPassword
    );
    if (error) {
      setConfirmPasswordError(message);
    } else {
      setConfirmPasswordError("");
    }
  }

  return {
    values,
    nameError,
    setNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    imageError,
    priceError,
    setDescError,
    setPriceError,
    setImageError,
    descError,
    handleBlur,
    handleChange,
    isFormValid,
    clearForm,
    fillForm,
  };
}
