import Nav from "../Nav/Nav";
import Title from "../Title/Title";
import "./CommonRoute.css";

const CommonRoute = ({ children, currentRoute, title, prevRoute }) => {
  return (
    <div className="myaccount  container">
      {/* nav */}
      <Nav currentRoute={currentRoute} />
      {/* title */}
      <Title prevRoute={prevRoute} title={title} />
      {children}
    </div>
  );
};

export default CommonRoute;
