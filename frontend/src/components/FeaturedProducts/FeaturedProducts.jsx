import { faGreaterThan, faLessThan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useState } from "react";
import "./FeaturedProducts.css";
import Product from "../Prouct/Product";
import { statusEnum } from "../../constants";
import ErrorComp from "../ErrorComp/ErrorComp";
import productApi from "../../api/productApi";

const FeaturedProducts = () => {
  const [slidesValues, setSlidesValues] = useState({
    currSlidePos: 0,
    marginLeft: 0,
    slideWidthInPercent: 100,
  });

  const [values, setValues] = useState({
    status: statusEnum.initial,
    error: null,
    products: null,
  });
  useEffect(() => {
    setValues({
      ...values,
      status: statusEnum.loading,
    });

    productApi
      .getProducts()
      .then((products) =>
        setValues({
          ...values,
          status: statusEnum.fetched,
          products,
        })
      )
      .catch((error) =>
        setValues({
          ...values,
          status: statusEnum.error,
          error,
        })
      );

    handleResize(setSlidesValues);

    window.addEventListener(
      "resize",
      debounce({ func: handleResize, delay: 200, setSlidesValues })
    );
    return () => {
      window.removeEventListener(
        "resize",
        debounce({ func: handleResize, delay: 200, setSlidesValues })
      );
    };
  }, []);
  const { status, products } = values;

  return (
    <div className="featured-products container">
      {status === statusEnum.error && <ErrorComp error={values.error} />}
      {status === statusEnum.loading && <div>Loading...</div>}
      {status === statusEnum.fetched && (
        <>
          {/* title */}
          <h3 className="title">featured products</h3>
          {/* products slider */}
          <div className="products-slider">
            {/* prev icon */}
            <FontAwesomeIcon
              onClick={prevSlide({ products, slidesValues, setSlidesValues })}
              className="icon"
              icon={faLessThan}
            />
            {/* next icon */}
            <FontAwesomeIcon
              onClick={nextSlide({ products, slidesValues, setSlidesValues })}
              className="icon right"
              icon={faGreaterThan}
            />
            <div className="slides">
              {products?.length > 0 && (
                <Slide
                  key={products[0]._id}
                  first={true}
                  marginLeft={slidesValues.marginLeft}
                  product={products[0]}
                />
              )}
              {products?.length > 0 &&
                products
                  .slice(1)
                  .map((product) => (
                    <Slide
                      key={product._id}
                      marginLeft={slidesValues.marginLeft}
                      product={product}
                    />
                  ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

//////////////////////////////// helpers ///////////////////
const Slide = ({ product, first, marginLeft }) => {
  return (
    <div style={{ marginLeft: first ? marginLeft : "unset" }} className="slide">
      <Product product={product} />
    </div>
  );
};
function debounce({ func, delay, setSlidesValues }) {
  //for resize events
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(function () {
      func(setSlidesValues);
    }, delay);
  };
}
function slidesInVeiw(numOfSlides, slideWidthInPercent) {
  return Math.ceil((numOfSlides * slideWidthInPercent) / 100);
}
function handleResize(setSlidesValues) {
  let windowWidth = window.innerWidth;

  //   md
  if (windowWidth >= 768 && windowWidth < 992) {
    setSlidesValues({
      currSlidePos: 0,
      marginLeft: 0,
      slideWidthInPercent: 50,
    });
  }
  //   lg
  else if (windowWidth >= 992) {
    setSlidesValues({
      currSlidePos: 0,
      marginLeft: 0,

      slideWidthInPercent: 25,
    });
  } else {
    setSlidesValues({
      currSlidePos: 0,
      marginLeft: 0,
      slideWidthInPercent: 100,
    });
  }
}
const nextSlide =
  ({ products, slidesValues, setSlidesValues }) =>
  () => {
    const { slideWidthInPercent, currSlidePos } = slidesValues;
    const numOfSlides = products.length;

    if (currSlidePos < slidesInVeiw(numOfSlides, slideWidthInPercent) - 1) {
      setSlidesValues({
        ...slidesValues,
        currSlidePos: currSlidePos + 1,
        marginLeft: `${-(currSlidePos + 1) * 100}%`,
      });
    } else {
      setSlidesValues({
        ...slidesValues,
        currSlidePos: 0,
        marginLeft: "0px",
      });
    }
  };
const prevSlide =
  ({ products, slidesValues, setSlidesValues }) =>
  () => {
    const { currSlidePos, slideWidthInPercent } = slidesValues;
    const numOfSlides = products.length;

    if (currSlidePos > 0) {
      setSlidesValues({
        ...slidesValues,
        currSlidePos: currSlidePos - 1,
        marginLeft: `${-(currSlidePos - 1) * 100}%`,
      });
    } else {
      setSlidesValues({
        ...slidesValues,
        currSlidePos: slidesInVeiw(numOfSlides, slideWidthInPercent) - 1,
        marginLeft: `${
          -(slidesInVeiw(numOfSlides, slideWidthInPercent) - 1) * 100
        }%`,
      });
    }
  };
export default FeaturedProducts;
