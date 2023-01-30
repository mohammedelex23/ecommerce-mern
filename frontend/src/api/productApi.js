import axios from "axios";
import configs from "../configs";
import auth from "../auth/auth";
const getProducts = async function () {
  try {
    let res = await axios.get(`${configs.BASE_URL}/api/products`);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
const createProduct = async function (form) {
  try {
    let res = await axios.post(`${configs.BASE_URL}/api/products`, form);
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
const updateProduct = async function (form, productId) {
  try {
    let res = await axios.put(
      `${configs.BASE_URL}/api/products/${productId}`,
      form
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
const deleteProduct = async function (productId) {
  try {
    let res = await axios.delete(
      `${configs.BASE_URL}/api/products/${productId}`
    );
    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};
const checkout = async function (cartItems) {
  try {
    let res = await axios.post(
      `${configs.BASE_URL}/api/stripe/create-checkout-session`,
      { cart: cartItems },
      {
        headers: {
          authorization: "Bearer " + auth.getToken(),
        },
      }
    );

    return res.data;
  } catch (error) {
    throw error.response.data;
  }
};

export default {
  getProducts,
  checkout,
  createProduct,
  updateProduct,
  deleteProduct,
};
