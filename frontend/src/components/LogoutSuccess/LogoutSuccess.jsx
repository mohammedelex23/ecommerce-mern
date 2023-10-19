import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLogoutSuccess } from "../../redux/slices/utilsSlice";
import CommonRoute from "../CommonRoute/CommonRoute";
import "./LogoutSuccess.css";

const LogoutSuccess = () => {
  const logoutSuccess = useSelector(selectLogoutSuccess);

  const handleClick = () => {
    window.location.href = "/";
  };
  if (!logoutSuccess) {
    return <Navigate to="/" replace={true} />;
  } else
    return (
      <CommonRoute currentRoute="log out" title="log out">
        <div className="logout">
          <p>
            <FontAwesomeIcon className="icon" icon={faTriangleExclamation} />
            You have successfully logged out from your account.
          </p>

          <button onClick={handleClick}>click here to continue</button>
        </div>
      </CommonRoute>
    );
};
export default LogoutSuccess;
