import { useState } from "react";
import validator from "../auth/validator";

export default function useForm() {
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
    } else if (field === "confirmPassword") {
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
    } else if (field === "name") {
      validateName(value);
    }
  };
  const isFormValid = function () {
    let { error: emailError } = validator.validateEmail(values.email);
    let { error: passwordError } = validator.validatePassword(values.password);
    let { error: nameError } = validator.validateName(values.name);
    validateEmail(values.email);
    validatePassword(values.password);
    validateName(values.name);
    return emailError && passwordError && nameError;
  };
  function validateEmail(email) {
    let { error, message } = validator.validateEmail(email);
    if (error) {
      setEmailError(message);
    } else {
      setEmailError("");
    }
  }
  function validatePassword(password) {
    let { error, message } = validator.validatePassword(password);
    if (error) {
      setPasswordError(message);
    } else {
      validateConfirmPassword(password, values.confirmPassword);
      setPasswordError("");
    }
  }
  function validateName(name) {
    let { error, message } = validator.validateName(name);
    if (error) {
      setNameError(message);
    } else {
      setNameError("");
    }
  }
  function validateConfirmPassword(password, confirmPassword) {
    let { error, message } = validator.validateConfirmPassword(
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
    emailError,
    passwordError,
    confirmPasswordError,
    handleBlur,
    handleChange,
    isFormValid,
  };
}
