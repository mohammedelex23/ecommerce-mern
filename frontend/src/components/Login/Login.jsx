import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightToBracket,
  faRotateRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import ErrorComp from "../ErrorComp/ErrorComp";
import useLoginForm from "../../hooks/useLoginForm";
import authApi from "../../api/authApi";
import { useState } from "react";
import auth from "../../auth/auth";

export default function Login() {
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const {
    values,
    emailError,
    passwordError,
    handleBlur,
    handleChange,
    isFormValid,
  } = useLoginForm();
  const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);

  const handleSubmit = async function (e) {
    e.preventDefault();
    let isValid = isFormValid();
    if (!isValid || emailError || passwordError) return;
    setDisableSubmitBtn(true);

    let { email, password } = values;
    email = email.trim();
    password = password.trim();
    try {
      let user = await authApi.callAuth({
        endpoint: "login",
        method: "POST",
        body: { email, password },
      });
      console.log(user);
      setAuthError("");
      setDisableSubmitBtn(false);

      auth.authenticateUser(user);
      window.location.reload("/myaccount");
    } catch (error) {
      setDisableSubmitBtn(false);

      if (error?.type === "AccountVerification") {
        // redirect to account verify route
        navigate("/registeration_success", { state: "Account Verification" });
      } else {
        setAuthError(error.message || "something went wrong");
      }
    }
  };
  return (
    <div className="child login">
      <h4 className="myaccount-title">RETURNING CUSTOMERS</h4>
      <p>Please log in to your account.</p>
      {authError && (
        <div style={{ marginBottom: "10px", textAlign: "center" }}>
          <ErrorComp error={authError} />
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange("email")}
          onBlur={handleBlur("email")}
          name="email"
          placeholder="Email"
          type="text"
          autoFocus
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
          <span>LOG IN TO MY ACCOUNT</span>
        </button>
      </form>
      {/* button */}
      <button className="myaccount-btn reset">
        <FontAwesomeIcon icon={faRotateRight} />
        <span>RESET MY PASSWORD</span>
      </button>
    </div>
  );
}
