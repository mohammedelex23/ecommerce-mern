import axios from "axios";
import configs from "../configs";
import auth from "../auth/auth";
const getProducts = async function () {
  try {
    let res = await axios.get(`${configs.BASE_URL}/products`);
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};
const createProduct = async function (form) {
  try {
    let res = await axios.post(`${configs.BASE_URL}/products`, form);
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};
const updateProduct = async function (form, productId) {
  try {
    let res = await axios.put(
      `${configs.BASE_URL}/products/${productId}`,
      form
    );
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};
const deleteProduct = async function (productId) {
  try {
    let res = await axios.delete(`${configs.BASE_URL}/products/${productId}`);
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};
const checkout = async function (cartItems) {
  try {
    let res = await axios.post(
      `${configs.BASE_URL}/stripe/create-checkout-session`,
      { cart: cartItems },
      {
        headers: {
          authorization: "Bearer " + auth.getToken(),
        },
      }
    );

    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};

export default {
  getProducts,
  checkout,
  createProduct,
  updateProduct,
  deleteProduct,
};
