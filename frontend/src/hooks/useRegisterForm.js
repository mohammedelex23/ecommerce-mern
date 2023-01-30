import { useState } from "react";
import formValidator from "../utils/formValidator";

export default function useRegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else if (field === "name") {
      validateName(value);
    } else {
      validateConfirmPassword(values.password, value);
    }
    setValues({ ...values, [field]: value });
  };

  const handleBlur = (field) => (e) => {
    let value = e.target.value;
    if (field === "email") {
      validateEmail(value);
    } else if (field === "password") {
      validatePassword(value);
    } else {
      validateName(value);
    }
  };

  const isFormValid = function (type) {
    let { error: nameError } = formValidator.validateName(values.name);
    let { error: emailError } = formValidator.validateEmail(values.email);
    let { error: passwordError } = formValidator.validatePassword(
      values.password
    );

    validateEmail(values.email);
    validatePassword(values.password);
    validateName(values.name);

    return !(emailError || passwordError || nameError);
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

  function validateName(name) {
    let { error, message } = formValidator.validateName(name);
    if (error) {
      setNameError(message);
    } else {
      setNameError("");
    }
  }

  return {
    values,
    emailError,
    passwordError,
    confirmPasswordError,
    nameError,
    isFormValid,
    handleChange,
    handleBlur,
  };
}
