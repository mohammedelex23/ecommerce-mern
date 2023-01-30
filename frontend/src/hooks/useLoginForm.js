import { useState } from "react";
import formValidator from "../utils/formValidator";

export default function useLoginForm() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    if (field === "email") validateEmail(value);
    else validatePassword(value);
    setValues({ ...values, [field]: value });
  };

  const handleBlur = (field) => (e) => {
    let value = e.target.value;
    if (field === "email") validateEmail(value);
    else validatePassword(value);
  };

  const isFormValid = function (type) {
    let { error: emailError } = formValidator.validateEmail(values.email);
    let { error: passwordError } = formValidator.validatePassword(
      values.password
    );

    validateEmail(values.email);
    validatePassword(values.password);

    return !(emailError || passwordError);
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
      setPasswordError("");
    }
  }

  return {
    values,
    emailError,
    passwordError,
    isFormValid,
    handleChange,
    handleBlur,
  };
}
