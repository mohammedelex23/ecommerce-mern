import { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import ErrorComp from "../ErrorComp/ErrorComp";
import {
  selectShowSHippingRoute,
  showShippingRoute,
} from "../../redux/slices/utilsSlice";
import "./ShippingAddress.css";
import { useDispatch, useSelector } from "react-redux";
import useShippingForm from "../../hooks/useShippingForm";
import callApi from "../../api/api";
import auth from "../../auth/auth";
import CommonRoute from "../CommonRoute/CommonRoute";
const ShippingAddress = () => {
  const showShippingRoute = useSelector(selectShowSHippingRoute);
  if (!showShippingRoute) {
    return <Navigate to="/" replace={true} />;
  }

  const [authError, setAuthError] = useState("");

  return (
    <CommonRoute currentRoute="shipping address" title="shipping information">
      {authError && (
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <ErrorComp error={authError} />
        </div>
      )}
      <Form />
    </CommonRoute>
  );
};

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state: locationState } = useLocation();

  const user = auth.getLocalUser();

  const { values, errors, handleBlur, handleChange, isFormValid } =
    useShippingForm();
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const handleSubmit = async function (e) {
    e.preventDefault();

    let isValid = isFormValid();
    if (!isValid) return;
    setDisableSubmitBtn(true);

    let { state, city, phone } = values;
    state = state.trim();
    city = city.trim();
    phone = phone.trim();

    try {
      // update shipping address
      let updatedAddress = await callApi(
        `users/${user._id}/shippingAddress`,
        "put",
        values
      );

      window.location.replace(locationState.checkoutUrl);
      // navigate(locationState.checkoutUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <ShippingInfo
        handleBlur={handleBlur}
        handleChange={handleChange}
        stateError={errors.state}
        cityError={errors.city}
        phoneError={errors.phone}
        values={values}
      />
      {/* button */}
      <button
        style={{
          backgroundColor: disableSubmitBtn ? "gray" : "#000000",
          cursor: disableSubmitBtn ? "not-allowed" : "pointer",
        }}
        disabled={disableSubmitBtn}
        className="myaccount-btn"
      >
        <span>PROCEED TO CHECKOUT</span>
      </button>
    </form>
  );
}

function ShippingInfo({
  handleBlur,
  handleChange,
  stateError,
  cityError,
  phoneError,
  values,
}) {
  return (
    <div style={{ marginTop: "20px" }}>
      {/* <div> */}
      <input
        onChange={handleChange("state")}
        onBlur={handleBlur("state")}
        name="state"
        placeholder="State"
        type="text"
        value={values.state}
      />
      {stateError && (
        <div className="input-error">
          <ErrorComp error={stateError} />
        </div>
      )}
      <input
        onChange={handleChange("city")}
        onBlur={handleBlur("city")}
        name="city"
        placeholder="City"
        type="text"
        value={values.city}
      />
      {cityError && (
        <div className="input-error">
          <ErrorComp error={cityError} />
        </div>
      )}
      <input
        onChange={handleChange("phone")}
        onBlur={handleBlur("phone")}
        name="phone"
        placeholder="Phone"
        value={values.phone}
      />
      {phoneError && (
        <div className="input-error">
          <ErrorComp error={phoneError} />
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
export default ShippingAddress;
