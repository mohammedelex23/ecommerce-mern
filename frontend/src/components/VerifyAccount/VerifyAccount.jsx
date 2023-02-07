import "./VerifyAccount.css";
import { useSearchParams, Navigate, useNavigate, Link } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useState } from "react";
import ErrorComp from "../ErrorComp/ErrorComp";
import auth from "../../auth/auth";
import authApi from "../../api/authApi";
import { useEffect } from "react";
import api from "../../api/api";

export default function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const userId = searchParams.get("id");
  const [verificationError, setVerificationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [accountIsVerified, setAccountIsVerified] = useState(false);

  useEffect(() => {
    if (!token || auth.isUserVerified()) {
      return navigate("/", { replace: true });
    }
    const verifyUser = async () => {
      try {
        setServerError(false);
        setVerificationError(false);
        let res = await authApi.callAuth({
          endpoint: "verify",
          method: "put",
          token,
          userId,
        });
        setAccountIsVerified(true);
      } catch (error) {
        if (error.name === "TokenError") {
          setVerificationError(true);
        } else if (error.name === "AccountVerifiedError") {
          navigate("/login", { replace: true });
        } else {
          setServerError(true);
        }
      }
    };
    verifyUser();
  }, []);

  const handleGetNewVerificationLink = async function () {
    try {
      if (!userId) {
        alert("Invalid link you will be redirected to home page");
        setTimeout(() => {
          navigate("/");
        }, 2000);
        return;
      }
      let res = await authApi.callAuth({ endpoint: `resend_email/${userId}` });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {verificationError && (
        <div className="verify-account">
          <p className="error">Verification link is expired</p>
          <p>
            The verification link sent to your <strong>email is expired</strong>
            , please click the button bellow to <strong>get new one</strong>
          </p>
          <button onClick={handleGetNewVerificationLink}>
            get new verification link
          </button>
          {/* <div>
            <a href="/">go to home</a>
          </div> */}
        </div>
      )}
      {serverError && (
        <div className="verify-account">
          <p className="error">Something went wrong try again</p>
          <button>verify account</button>
        </div>
      )}
      {accountIsVerified && (
        <div className="verify-account">
          <h2 style={{ color: "green" }}>Verified Successfully</h2>
          <p>your account is verified succssfully please go to login page</p>
          <Link to="/login" replace>
            go to login
          </Link>
        </div>
      )}
    </div>
  );
}
