import "./Success.css";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function Success() {
  localStorage.removeItem("cart");

  if (!localStorage.getItem("payment_success")) {
    return <Navigate to="/" replace />;
  }
  localStorage.removeItem("payment_success");

  return (
    <div className="success-wrapper">
      <h2>Order succeeded</h2>
      <p>We will email you with shipping informatin</p>
      <p>
        We appreciate your business! If you have any questions, please email
        <a href="mailto:orders@example.com"> orders@example.com</a>.
      </p>
      <div className="return-home">
        <FontAwesomeIcon icon={faArrowLeft} />
        <a className="link" href="/">
          Continue shopping
        </a>
      </div>
    </div>
  );
}
