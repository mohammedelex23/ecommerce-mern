import { useEffect, useState } from "react";
import callApi from "../api/api";
import auth from "../auth/auth";
import formValidator from "../utils/formValidator";

export default function useUpdateAccountForm() {
  const user = auth.getLocalUser();

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const setPasswordError = (error) => {
    setErrors({
      ...errors,
      password: error,
    });
  };
  const setNewValues = (newValues) => {
    setValues({
      ...values,
      ...newValues,
    });
  };
  useEffect(() => {
    // get shipping information
    callApi(`users/${user._id}`)
      .then((user) => {
        if (user) {
          setValues({
            ...values,
            name: user.name,
            email: user.email,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (field) => (e) => {
    let value = e.target.value;
    validateFormField(field, value);
    setValues({ ...values, [field]: value });
  };

  const handleBlur = (field) => (e) => {
    let value = e.target.value;
    validateFormField(field, value);
  };

  const isFormValid = function (type) {
    let nameError = validateFormField("name", values.name);
    let emailError = validateFormField("email", values.email);
    let passwordError = validateFormField("password", values.password);
    return !(nameError || emailError || passwordError);
  };

  function validateFormField(field, value) {
    let { error, message } = formValidator.validateFormField(field, value);

    if (error) {
      setErrors((prev) => {
        return {
          ...prev,
          [field]: message,
        };
      });
      return true;
    } else {
      setErrors((prev) => {
        return {
          ...prev,
          [field]: "",
        };
      });
      return false;
    }
  }

  return {
    values,
    errors,
    isFormValid,
    handleChange,
    handleBlur,
    setPasswordError,
    setNewValues,
  };
}
