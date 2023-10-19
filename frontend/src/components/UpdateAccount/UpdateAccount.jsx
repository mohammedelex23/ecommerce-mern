import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import callApi from "../../api/api";
import ErrorComp from "../ErrorComp/ErrorComp";
import { useDispatch } from "react-redux";
import CommonRoute from "../CommonRoute/CommonRoute";
import useUpdateAccountForm from "../../hooks/useUpdateAccountForm";
import useShippingForm from "../../hooks/useShippingForm";
import "./UpdateAccount.css";
import formValidator from "../../utils/formValidator";
import auth from "../../auth/auth";
const UpdateAccount = () => {
  const [authError, setAuthError] = useState("");
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const [updateShippingInfo, setUpdateShippingInfo] = useState(false);
  const [passwordValues, setPasswordValues] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });
  const [showUpdatedSuccess, setShowUpdatedSuccess] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    values,
    errors,
    handleBlur,
    handleChange,
    isFormValid,
    setPasswordError,
  } = useUpdateAccountForm();
  const {
    values: shippingFormValues,
    errors: shippingFormErrors,
    handleBlur: shippingFormHandleBlur,
    handleChange: shippingFormHandleChange,
    isFormValid: shippingFormIsFormValid,
  } = useShippingForm();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    setShowUpdatedSuccess(false);

    let isValid = isFormValid();
    // shipping form
    let isShippingFormValid = true;
    if (updateShippingInfo) {
      isShippingFormValid = shippingFormIsFormValid();
    }
    // new password
    let newPasswordValid = true;
    if (passwordValues.newPassword.length > 0) {
      newPasswordValid = isNewPasswordValid();
    } else {
      setPasswordErrors({
        newPassword: "",
        confirmNewPassword: "",
      });
    }
    if (!isValid || !isShippingFormValid || !newPasswordValid) return;
    setDisableSubmitBtn(true);

    let { email, password, name } = values;
    email = email.trim();
    password = password.trim();
    name = name.trim();
    let newPassword = passwordValues.newPassword;

    let { state, city, phone } = shippingFormValues;
    state = state?.trim();
    city = city?.trim();
    phone = phone?.trim();

    const user = auth.getLocalUser();

    const body = {
      email,
      name,
      oldPassword: password,
      newPassword,
    };
    if (updateShippingInfo) {
      body.shippingAddress = {
        state,
        city,
        phone,
      };
    }
    try {
      let updatedUser = await callApi(`users/${user._id}`, "put", body);
      //  update localUser
      auth.updateLocalUser(updatedUser);
      // show updated success
      setShowUpdatedSuccess(true);
      setTimeout(() => {
        setShowUpdatedSuccess(false);
      }, 3000);
      setAuthError("");
      setDisableSubmitBtn(false);

      // redirect to registeration_success route
      // dispatch(showRegisterSuccess());
      // localStorage.setItem("registeration_success", "registeration_success");
      // navigate("/signupSuccess", { state: "Registeration Success" });
    } catch (error) {
      setDisableSubmitBtn(false);

      if (error.type === "passwordError") {
        setPasswordError(error.message);
      } else {
        setAuthError(error.message || "something went wrong");
      }
    }
  };
  const isNewPasswordValid = () => {
    if (passwordErrors.newPassword || passwordErrors.confirmNewPassword) {
      return false;
    }
    return true;
  };
  const handlePasswordBlur = (name) => (e) => {};
  const handlePasswordChange = (name) => (e) => {
    let value = e.target.value;
    if (name === "newPassword") {
      let { error, message } = formValidator.validatePassword(value);
      if (error) {
        setPasswordErrors({
          ...passwordErrors,
          [name]: message,
        });
      } else {
        let { message } = formValidator.validateConfirmPassword(
          value,
          passwordValues.confirmNewPassword
        );
        setPasswordErrors({
          ...passwordErrors,
          [name]: "",
          confirmNewPassword: message,
        });
      }
    } else {
      let { message } = formValidator.validateConfirmPassword(
        passwordValues.newPassword,
        value
      );
      setPasswordErrors({
        ...passwordErrors,
        [name]: message,
      });
    }

    setPasswordValues({
      ...passwordValues,
      [name]: value,
    });
  };
  const handleShipppingInfoBtnClick = (e) => {
    e.preventDefault();
    setUpdateShippingInfo(!updateShippingInfo);
  };
  return (
    <CommonRoute
      showBackLink={true}
      currentRoute="update account"
      title="update account"
    >
      {showUpdatedSuccess && <UpdatedSuccess />}
      <form className="form" onSubmit={handleSubmit}>
        {authError && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <ErrorComp error={authError} />
          </div>
        )}
        <BasicInfo
          emailError={errors.email}
          nameError={errors.name}
          passwordError={errors.password}
          newPasswordError={passwordErrors.newPassword}
          confirmNewPasswordError={passwordErrors.confirmNewPassword}
          handlePasswordChange={handlePasswordChange}
          handlePasswordBlur={handlePasswordBlur}
          values={values}
          handleBlur={handleBlur}
          handleChange={handleChange}
        />
        <UpdateShippingInfo
          handleBlur={handleBlur}
          handleChange={handleChange}
          updateShippingInfo={updateShippingInfo}
          handleShipppingInfoBtnClick={handleShipppingInfoBtnClick}
          shippingFormHandleBlur={shippingFormHandleBlur}
          shippingFormHandleChange={shippingFormHandleChange}
          shippingFormValues={shippingFormValues}
          shippingFormErrors={shippingFormErrors}
          shippingFormIsFormValid={shippingFormIsFormValid}
        />
        <UpdateButton disableSubmitBtn={disableSubmitBtn} />
        <LoginLink />
      </form>
    </CommonRoute>
  );
};
function UpdatedSuccess() {
  return (
    <div className="updated-success form">
      <p>Your account is updated successfully.</p>
    </div>
  );
}
function UpdateShippingInfo({
  updateShippingInfo,
  handleShipppingInfoBtnClick,
  shippingFormHandleBlur,
  shippingFormHandleChange,
  shippingFormValues,
  shippingFormErrors,
  shippingFormIsFormValid,
}) {
  return (
    <div className="update-shipping-info">
      <UpdateShippingInfoButton
        handleShipppingInfoBtnClick={handleShipppingInfoBtnClick}
        updateShippingInfo={updateShippingInfo}
      />
      <div
        style={{ height: updateShippingInfo ? "240px" : "0px" }}
        className="shipping-info-box"
      >
        <ShippingInfo
          handleBlur={shippingFormHandleBlur}
          handleChange={shippingFormHandleChange}
          values={shippingFormValues}
          errors={shippingFormErrors}
          isFormValid={shippingFormIsFormValid}
        />
      </div>
    </div>
  );
}
function UpdateShippingInfoButton({
  updateShippingInfo,
  handleShipppingInfoBtnClick,
}) {
  return (
    <div
      onClick={handleShipppingInfoBtnClick}
      className="update-shipping-info-btn"
    >
      <span>update shipping information</span>
      <FontAwesomeIcon icon={updateShippingInfo ? faMinus : faPlus} />
    </div>
  );
}
function LoginLink() {
  return (
    <div className="login-link">
      <p>
        already have an account? <Link to="/myaccount">Login</Link>
      </p>
    </div>
  );
}
function UpdateButton({ disableSubmitBtn }) {
  return (
    <button
      style={{
        backgroundColor: disableSubmitBtn ? "gray" : "#000000",
        cursor: disableSubmitBtn ? "not-allowed" : "pointer",
      }}
      disabled={disableSubmitBtn}
      className="myaccount-btn sigup-btn"
    >
      UPDATE
    </button>
  );
}

function BasicInfo({
  handleChange,
  handleBlur,
  nameError,
  emailError,
  passwordError,
  newPasswordError,
  confirmNewPasswordError,
  values,
  handlePasswordChange,
  handlePasswordBlur,
}) {
  return (
    <div>
      <h3 className="form-title">basic information</h3>
      <input
        onChange={handleChange("name")}
        onBlur={handleBlur("name")}
        name="name"
        placeholder="Name"
        type="text"
        value={values.name}
      />
      {nameError && (
        <div className="input-error">
          <ErrorComp error={nameError} />
        </div>
      )}
      <input
        onChange={handleChange("email")}
        onBlur={handleBlur("email")}
        name="email"
        placeholder="Email"
        type="text"
        value={values.email}
      />
      {emailError && (
        <div className="input-error">
          <ErrorComp error={emailError} />
        </div>
      )}
      <input
        onChange={handleChange("password")}
        onBlur={handleBlur("password")}
        name="password"
        placeholder="Password"
        type="password"
      />
      {passwordError && (
        <div className="input-error">
          <ErrorComp error={passwordError} />
        </div>
      )}
      <input
        onChange={handlePasswordChange("newPassword")}
        onBlur={handlePasswordBlur("newPassword")}
        name="newPassword"
        placeholder="New password"
        type="password"
      />
      {newPasswordError && (
        <div className="input-error">
          <ErrorComp error={newPasswordError} />
        </div>
      )}
      <input
        onChange={handlePasswordChange("confirmNewPassword")}
        onBlur={handlePasswordBlur("confirmNewPassword")}
        name="confirmNewPassword"
        placeholder="Confirm password"
        type="password"
      />
      {confirmNewPasswordError && (
        <div className="input-error">
          <ErrorComp error={confirmNewPasswordError} />
        </div>
      )}
    </div>
  );
}
function ShippingInfo({ handleBlur, handleChange, values, errors }) {
  return (
    <div style={{ marginTop: "20px" }}>
      <h3 className="form-title">shipping information</h3>
      <div>
        <input
          onChange={handleChange("state")}
          onBlur={handleBlur("state")}
          name="state"
          placeholder="State"
          type="text"
          value={values.state}
        />
        {errors.state && (
          <div className="input-error">
            <ErrorComp error={errors.state} />
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
        {errors.city && (
          <div className="input-error">
            <ErrorComp error={errors.city} />
          </div>
        )}
        <input
          onChange={handleChange("phone")}
          onBlur={handleBlur("phone")}
          name="phone"
          placeholder="Phone"
          value={values.phone}
        />
        {errors.phone && (
          <div className="input-error">
            <ErrorComp error={errors.phone} />
          </div>
        )}
      </div>
    </div>
  );
}
export default UpdateAccount;
