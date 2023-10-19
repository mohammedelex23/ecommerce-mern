import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = ({ currentRoute }) => {
  return (
    <nav className="nav">
      <Link to="/">Home</Link>
      <Link>{currentRoute}</Link>
    </nav>
  );
};

export default Nav;
