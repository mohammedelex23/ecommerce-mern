import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import "./Title.css";

const Title = ({ title, prevRoute }) => {
  return (
    <div className="title-box">
      <h2 className="title">{title}</h2>
      {prevRoute && (
        <Link to={`/${prevRoute}`} className="back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>{prevRoute}</span>
        </Link>
      )}
    </div>
  );
};

export default Title;
