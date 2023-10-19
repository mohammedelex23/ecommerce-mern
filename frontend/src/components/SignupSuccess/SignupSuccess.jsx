import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectRegisterSuccess } from "../../redux/slices/utilsSlice";
import CommonRoute from "../CommonRoute/CommonRoute";

const SignupSuccess = () => {
  const registerSuccess = useSelector(selectRegisterSuccess);
  if (!registerSuccess) {
    return <Navigate to="/" replace={true} />;
  } else
    return (
      <CommonRoute currentRoute="thank you" title="thank you">
        <div className="signup-success">
          <p>you have successfully signed up.</p>
          <p>
            now go to your email and click the verification link to be able to
            log in.
          </p>
        </div>
      </CommonRoute>
    );
};

export default SignupSuccess;
