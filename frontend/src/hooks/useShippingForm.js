import { useEffect, useState } from "react";
import callApi from "../api/api";
import auth from "../auth/auth";
import formValidator from "../utils/formValidator";

export default function useShippingForm() {
  const user = auth.getLocalUser();

  const [values, setValues] = useState({
    state: "",
    city: "",
    phone: "",
  });

  const [errors, setErrors] = useState({
    state: "",
    city: "",
    phone: "",
  });
  const [stripeError, setStripeError] = useState(null);
  useEffect(() => {
    // get shipping information
    callApi(`users/${user._id}/shippingAddress`)
      .then((shippingAddress) => {
        if (shippingAddress) {
          setValues(shippingAddress);
        }
      })
      .catch((error) => {
        console.log(error);
        setStripeError("Something went wrong, try again later");
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
    let stateError = validateFormField("state", values.state);
    let cityError = validateFormField("city", values.city);
    let phoneError = validateFormField("phone", values.phone);
    return !(stateError || cityError || phoneError);
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
    stripeError,
  };
}
