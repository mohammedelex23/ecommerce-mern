import "./RegisterSuccess.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
export default function RegisterSuccess() {
  const { state } = useLocation();

  let registeration_success = localStorage.getItem("registeration_success");

  useEffect(() => {
    localStorage.removeItem("registeration_success");
  });

  if (!state || !registeration_success) {
    return <Navigate to="/" />;
  }

  return (
    <div className="register-success">
      {state !== "Account Verification" && (
        <FontAwesomeIcon className="check-icon" icon={faCheck} />
      )}
      <h2>{state}</h2>
      <p className="first">
        please check your email and click the link provided to be able to use
        your account.
      </p>
      <p className="second">Didn't receive email?</p>
      <button>Resend Email</button>
      <Link replace to="/login" className="login-link">
        go to login <FontAwesomeIcon icon={faArrowRight} />
      </Link>
    </div>
  );
}
