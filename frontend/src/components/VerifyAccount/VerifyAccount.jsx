import "./VerifyAccount.css";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import auth from "../../auth/auth";
import authApi from "../../api/authApi";
import { useEffect } from "react";

const statusEnum = {
  SERVER_ERROR: "SERVER_ERROR",
  VERIFICATION_ERROR: "VERIFICATION_ERROR",
  ACCOUNT_VERIFIED: "ACCOUNT_VERIFIED",
};

export default function VerifyAccount() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const userId = searchParams.get("userId");
  const [verificationError, setVerificationError] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [accountIsVerified, setAccountIsVerified] = useState(false);

  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!token || auth.isUserVerified()) {
      return navigate("/", { replace: true });
    }
    const verifyUser = async () => {
      try {
        let res = await authApi.callAuth({
          endpoint: "verify",
          method: "put",
          token,
          userId,
        });
        setStatus(statusEnum.ACCOUNT_VERIFIED);
      } catch (error) {
        if (error.name === "TokenError") {
          setStatus(statusEnum.VERIFICATION_ERROR);
        } else if (error.name === "AccountVerified") {
          navigate("/myaccount", { replace: true });
        } else {
          setStatus(statusEnum.SERVER_ERROR);
        }
      }
    };
    verifyUser();
  }, []);

  const handleGetNewVerificationLink = async function () {
    console.log("userId", userId);
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
      {status === statusEnum.VERIFICATION_ERROR && (
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
      {status === statusEnum.SERVER_ERROR && (
        <div className="verify-account">
          <p className="error">Something went wrong try again</p>
          <button>verify account</button>
        </div>
      )}
      {status === statusEnum.ACCOUNT_VERIFIED && (
        <div className="verify-account">
          <h2 style={{ color: "green" }}>Verified Successfully</h2>
          <p>your account is verified succssfully please go to login page</p>
          <Link to="/myaccount" replace>
            go to login
          </Link>
        </div>
      )}
    </div>
  );
}
