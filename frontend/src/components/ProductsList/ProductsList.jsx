import React from "react";
import "./ProductsList.css";
import Product from "../Prouct/Product";
import productApi from "../../api/productApi";
import useApi from "../../hooks/useApi";
import configs from "../../configs";
import ErrorComp from "../ErrorComp/ErrorComp";
export default function Products() {
  const { data: products, isError, isLoading, error } = useApi(
    `${configs.BASE_URL}/api/products`
  );

  return (
    <>
      {isError && (
        <ErrorComp error={error?.message || "something went wrong"} />
      )}
      {isLoading && <div>Loading...</div>}
      {products?.length > 0 && (
        <div className="products">
          <h3 className="title">Products</h3>
          <ul className="products-wrapper">
            {products.length > 0 &&
              products.map((product) => (
                <React.Fragment key={product._id}>
                  <Product product={product} />
                </React.Fragment>
              ))}
          </ul>
        </div>
      )}
    </>
  );
}
