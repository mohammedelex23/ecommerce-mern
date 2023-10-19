import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import auth from "../../auth/auth";
import CommonRoute from "../CommonRoute/CommonRoute";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import "./MyAccount.css";
const MyAccount = () => {
  const [userStatus, setUserStatus] = useState("initial");

  useEffect(() => {
    let isLoggedIn = auth.isLoggedIn();
    if (isLoggedIn) {
      setUserStatus("loggedIn");
    } else {
      setUserStatus("notLoggedIn");
    }
  }, []);

  return (
    <CommonRoute currentRoute="my account" title="my account">
      <div className="myaccount for-media-query">
        {userStatus === "initial" && <div>Loading...</div>}
        {userStatus === "notLoggedIn" && (
          <>
            {/* create account */}
            <div className="child create">
              <CreateAccount />
            </div>
            {/* login */}
            <div className="child">
              <Login />
            </div>
          </>
        )}
        {userStatus === "loggedIn" && <Profile />}
      </div>
    </CommonRoute>
  );
};
function CreateAccount() {
  const navigate = useNavigate();

  return (
    <div className="child create-account">
      <h4 className="myaccount-title">NEW CUSTOMERS</h4>
      <p>
        If you don't have an account, please proceed by clicking the following
        button to continue first-time registration.
      </p>
      {/* button */}
      <button onClick={(e) => navigate("/signup")} className="myaccount-btn">
        <FontAwesomeIcon icon={faPencil} />
        <span>CREATE ACCOUNT</span>
      </button>
    </div>
  );
}
export default MyAccount;
