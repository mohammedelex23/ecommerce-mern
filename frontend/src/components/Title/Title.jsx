import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Title.css";

const Title = ({ title, showBackLink }) => {
  return (
    <div className="title-box">
      <h2 className="title">{title}</h2>
      {showBackLink && (
        <Link to="/myaccount" className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>my account</span>
        </Link>
      )}
    </div>
  );
};

export default Title;
