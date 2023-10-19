import axios from "axios";
import configs from "../configs";
const callAuth = async function ({ endpoint, method, body, token, userId }) {
  try {
    let res = await axios({
      method,
      url: `${configs.AUTH_URL}/${endpoint}?userId=${userId}`,
      data: body,
      headers: {
        authorization: "Bearer " + token,
      },
    });
    return res.data;
  } catch (error) {
    if (error.code === "ERR_NETWORK") throw "You are offline";
    throw error?.response?.data;
  }
};

export default { callAuth };
