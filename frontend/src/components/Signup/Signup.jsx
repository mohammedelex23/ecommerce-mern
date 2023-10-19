import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authApi from "../../api/authApi";
import useSignupForm from "../../hooks/useSignupForm";
import ErrorComp from "../ErrorComp/ErrorComp";
import { showRegisterSuccess } from "../../redux/slices/utilsSlice";
import "./Signup.css";
import { useDispatch } from "react-redux";
import CommonRoute from "../CommonRoute/CommonRoute";
const Signup = () => {
  const [authError, setAuthError] = useState("");
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    values,
    nameError,
    confirmPasswordError,
    emailError,
    passwordError,
    handleBlur,
    handleChange,
    isFormValid,
  } = useSignupForm();
  const handleSubmit = async function (e) {
    e.preventDefault();

    let isValid = isFormValid();
    if (
      !isValid ||
      nameError ||
      confirmPasswordError ||
      emailError ||
      passwordError
    )
      return;
    setDisableSubmitBtn(true);

    let { email, password, name } = values;
    email = email.trim();
    password = password.trim();
    name = name.trim();

    try {
      await authApi.callAuth({
        endpoint: "signup",
        method: "post",
        body: {
          email,
          password,
          name,
        },
      });

      setAuthError("");
      setDisableSubmitBtn(false);

      // redirect to registeration_success route
      dispatch(showRegisterSuccess());
      // localStorage.setItem("registeration_success", "registeration_success");
      navigate("/signupSuccess", { state: "Registeration Success" });
    } catch (error) {
      setDisableSubmitBtn(false);

      if (error?.type) {
        console.log(error);
      } else {
        setAuthError(error.message || "something went wrong");
      }
    }
  };
  return (
    <CommonRoute currentRoute="Create an account" title="new customers">
      <form className="form" onSubmit={handleSubmit}>
        {authError && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <ErrorComp error={authError} />
          </div>
        )}
        <BasicInfo
          emailError={emailError}
          nameError={nameError}
          passwordError={passwordError}
          confirmPasswordError={confirmPasswordError}
          handleBlur={handleBlur}
          handleChange={handleChange}
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
          <FontAwesomeIcon icon={faRightToBracket} />
          <span>REGISTER</span>
        </button>
        <div className="login-link">
          <p>
            already have an account? <Link to="/myaccount">Login</Link>
          </p>
        </div>
      </form>
    </CommonRoute>
  );
};

function BasicInfo({
  handleChange,
  handleBlur,
  nameError,
  emailError,
  passwordError,
  confirmPasswordError,
}) {
  return (
    <div>
      <input
        onChange={handleChange("name")}
        onBlur={handleBlur("name")}
        name="name"
        placeholder="Name"
        type="text"
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
        onChange={handleChange("confirmPassword")}
        name="confirmPassword"
        type="password"
        placeholder="Confirm password"
      />
      {confirmPasswordError && (
        <div className="input-error">
          <ErrorComp error={confirmPasswordError} />
        </div>
      )}
    </div>
  );
}
export default Signup;
