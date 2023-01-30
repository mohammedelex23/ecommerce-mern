import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url) {
  const [values, setValues] = useState({
    isLoading: false,
    isError: false,
    error: null,
    data: [],
  });

  const AddProducts = function (product) {
    let newProducts = [...values.data];
    newProducts.push(product);
    setValues({
      ...values,
      data: newProducts,
    });
  };
  const deleteProduct = function (productId) {
    let newProducts = [...values.data];
    newProducts = newProducts.filter((item) => item._id !== productId);
    setValues({
      ...values,
      data: newProducts,
    });
  };
  const editProduct = function (product) {
    let newProducts = [...values.data];
    newProducts = newProducts.map((item) => {
      if (item._id === product._id) {
        return product;
      } else {
        return item;
      }
    });
    setValues({
      ...values,
      data: newProducts,
    });
  };

  const callApi = async function () {
    setValues({
      ...values,
      isLoading: true,
      isError: false,
      data: [],
    });
    try {
      let res = await axios.get(url);

      setValues({
        ...values,
        isLoading: false,
        isError: false,
        data: res.data,
      });
    } catch (error) {
      console.log(error);

      setValues({
        ...values,
        isLoading: false,
        isError: true,
        error: error?.response?.data || error.message,
        data: [],
      });
    }
  };
  useEffect(() => {
    callApi();
  }, [url]);

  return { ...values, AddProducts, deleteProduct, editProduct };
}
