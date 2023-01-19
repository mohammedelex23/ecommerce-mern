import axios from "axios";
import configs from "../configs";
import auth from "../auth/auth";
const getProducts = async function () {
  try {
    let res = await axios.get(`${configs.BASE_URL}/api/products`);
    return res.data;
  } catch (error) {}
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
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getProducts, checkout };
