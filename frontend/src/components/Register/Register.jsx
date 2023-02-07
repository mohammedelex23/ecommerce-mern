import "./Register.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faUser } from "@fortawesome/free-regular-svg-icons";
import { faUnlockKeyhole } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, Navigate } from "react-router-dom";
import ErrorComp from "../ErrorComp/ErrorComp";
import useRegisterForm from "../../hooks/useRegisterForm";
import { useState } from "react";
import authApi from "../../api/authApi";
import auth from "../../auth/auth";
export default function Register() {
  const {
    values,
    nameError,
    confirmPasswordError,
    emailError,
    passwordError,
    handleBlur,
    handleChange,
    isFormValid,
  } = useRegisterForm();
  const [authError, setAuthError] = useState("");
  const navigate = useNavigate();

  const handleClick = async function () {
    let isValid = isFormValid();
    if (
      !isValid ||
      nameError ||
      confirmPasswordError ||
      emailError ||
      passwordError
    )
      return;
    let { email, password, name } = values;
    email = email.trim();
    password = password.trim();
    name = name.trim();

    try {
      let user = await authApi.callAuth({
        endpoint: "signup",
        method: "post",
        body: {
          email,
          password,
          name,
        },
      });

      setAuthError("");
      // redirect to registeration_success route
      localStorage.setItem("registeration_success", "registeration_success");
      navigate("/registeration_success", { state: "Registeration Success" });
    } catch (error) {
      if (error?.type) {
        console.log(error);
      } else {
        setAuthError(error.message || "something went wrong");
      }
    }
  };

  if (auth.isLoggedIn()) {
    return <Navigate to="/" />;
  }
  return (
    <div className="register-wrapper">
      <div className="register-content">
        {/* title */}
        <div className="title-container">
          <div className="title">
            <p>Register</p>
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
              <FontAwesomeIcon color="gray" icon={faUser} />
            </span>
            <input
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              type="text"
              name="name"
              placeholder="Enter your name"
            />
          </div>
          {nameError && <ErrorComp error={nameError} />}
        </div>
        <div className="input-wrapper">
          <div className="input-group">
            <span>
              <FontAwesomeIcon color="gray" icon={faEnvelope} />
            </span>
            <input
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              type="text"
              name="email"
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
              name="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          {passwordError && <ErrorComp error={passwordError} />}
        </div>
        <div className="input-wrapper">
          <div className="input-group">
            <span>
              <FontAwesomeIcon color="gray" icon={faUnlockKeyhole} />
            </span>
            <input
              onChange={handleChange("confirmPassword")}
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          {confirmPasswordError && <ErrorComp error={confirmPasswordError} />}
        </div>
        <div className="register-btn">
          <button onClick={handleClick}>register</button>
        </div>
        <div className="links">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
