import { useEffect } from "react";
import { useState } from "react";
import productApi from "../../api/productApi";
import "./AllProducts.css";
import Product from "../Prouct/Product";
import ErrorComp from "../ErrorComp/ErrorComp";
import { statusEnum } from "../../constants";

const AllProducts = () => {
  const [pagination, setPagination] = useState({
    pageSize: 8,
    currPage: 0,
  });
  const [values, setValues] = useState({
    status: statusEnum.initial,
    error: null,
    products: null,
  });
  const [clickedBtn, setClickedBtn] = useState("1");
  const handleClick = (id) => () => {
    if (clickedBtn !== id) {
      document.getElementById(clickedBtn).style.backgroundColor = "#7e7a7a";
      document.getElementById(id).style.backgroundColor = "#94b569";
      setClickedBtn(id);
    }
    setPagination({
      ...pagination,
      currPage: parseInt(id - 1),
    });
  };
  useEffect(() => {
    function fetchProducts() {
      setValues({
        status: statusEnum.loading,
        products: null,
      });
      productApi
        .getProducts()
        .then((products) =>
          setValues({
            status: statusEnum.fetched,
            products,
          })
        )
        .catch((error) => {
          console.log(error);
          setValues({
            status: statusEnum.error,
            error,
          });
        });
    }
    fetchProducts();
  }, []);
  const { status, products } = values;
  const { pageSize, currPage } = pagination;
  const btns = [];
  if (products) {
    let numOfBtns = Math.ceil(products.length / pageSize);

    for (let i = 1; i <= numOfBtns; i++) {
      btns.push(
        <button
          key={i}
          onClick={handleClick(i)}
          id={i}
          style={{ backgroundColor: i === 1 ? "#94b569" : "7e7a7a" }}
        >
          {i}
        </button>
      );
    }
  }
  return (
    <div className="all-products container">
      {status === statusEnum.error && <ErrorComp error={values.error} />}
      {status === statusEnum.loading && <div>Loading...</div>}
      {status === statusEnum.fetched && (
        <>
          {/* title */}
          <h2 className="all-products-title">all products</h2>
          {/* list of products */}
          <ul className="products">
            {[...products]
              .slice(currPage * pageSize, pageSize * (currPage + 1))
              .map((product) => (
                <li className="products-item" key={product._id}>
                  <Product product={product} />
                </li>
              ))}
          </ul>
          {/* pagination */}
          <div className="pagination">{btns}</div>
        </>
      )}
    </div>
  );
};

export default AllProducts;
