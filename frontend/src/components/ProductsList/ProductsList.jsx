import React from "react";
import "./ProductsList.css";
import Product from "../Prouct/Product";
import { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import useApi from "../../hooks/useApi";
import configs from "../../configs";
import { useDispatch, useSelector } from "react-redux";
import { fillCartItems, selectCart } from "../../redux/slices/cartSlice";
export default function Products() {
  let { cartItems: products } = useSelector(selectCart);

  return (
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
  );
}
