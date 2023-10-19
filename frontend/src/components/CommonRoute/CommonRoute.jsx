import Nav from "../Nav/Nav";
import Title from "../Title/Title";
import "./CommonRoute.css";

const CommonRoute = ({ children, currentRoute, title, showBackLink }) => {
  return (
    <div className="myaccount  container">
      {/* nav */}
      <Nav currentRoute={currentRoute} />
      {/* title */}
      <Title showBackLink={showBackLink} title={title} />
      {children}
    </div>
  );
};

export default CommonRoute;
