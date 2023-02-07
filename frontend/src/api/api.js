import axios from "axios";
import configs from "../configs";
const callApi = async function (endpoint, method, body) {
  try {
    let res = await axios({
      method,
      url: `${configs.BASE_URL}/api/${endpoint}`,
      data: body,
    });
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") throw "You are offline";
    throw error?.response?.data;
  }
};

export default { callApi };
