import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import ErrorComp from "../ErrorComp/ErrorComp";
import useLoginForm from "../../hooks/useLoginForm";
import authApi from "../../api/authApi";
import { useState } from "react";
import auth from "../../auth/auth";

export default function Login() {
  const {
    values,
    emailError,
    passwordError,
    handleBlur,
    handleChange,
    isFormValid,
  } = useLoginForm();
  const [authError, setAuthError] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const handleClick = async function () {
    let isValid = isFormValid();
    if (!isValid || emailError || passwordError) return;
    let { email, password } = values;
    email = email.trim();
    password = password.trim();
    try {
      let user = await authApi.callAuth({
        endpoint: "login",
        method: "post",
        body: { email, password },
      });
      setAuthError("");
      auth.authenticateUser(user);
      navigate(state || state?.pathname || "/", { state: state?.state });
    } catch (error) {
      if (error?.type === "AccountVerification") {
        // redirect to account verify route
        navigate("/registeration_success", { state: "Account Verification" });
      } else {
        setAuthError(error.message || "something went wrong");
      }
    }
  };

  if (auth.isLoggedIn()) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login-content">
        {/* title */}
        <div className="title-container">
          <div className="title">
            <p>LOG IN</p>
          </div>
        </div>
        {authError && (
          <div style={{ marginBottom: "10px", textAlign: "center" }}>
            <ErrorComp error={authError} />
          </div>
        )}
        <div className="input-wrapper">
          <div className="input-group">
            <span>
              <FontAwesomeIcon color="gray" icon={faEnvelope} />
            </span>
            <input
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              type="text"
              placeholder="Enter your email"
            />
          </div>
          {emailError && <ErrorComp error={emailError} />}
        </div>
        <div className="input-wrapper">
          <div className="input-group">
            <span>
              <FontAwesomeIcon color="gray" icon={faUnlockKeyhole} />
            </span>
            <input
              onChange={handleChange("password")}
              onBlur={handleBlur("password")}
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {passwordError && <ErrorComp error={passwordError} />}
        </div>
        <div className="login-btn">
          <button onClick={handleClick}>Log in</button>
        </div>
        <div className="links">
          <a href="">Forget Password?</a>
          <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
}
