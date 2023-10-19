import AllProducts from "../AllProducts/AllProducts";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import NewsLetter from "../NewsLetter/NewsLetter";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      <FeaturedProducts />
      <AllProducts />
      <NewsLetter />
    </div>
  );
};

export default Home;
