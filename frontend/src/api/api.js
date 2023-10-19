import axios from "axios";
import configs from "../configs";
const callApi = async function (endpoint, method, body) {
  try {
    let res = await axios({
      method,
      url: `${configs.BASE_URL}/${endpoint}`,
      data: body,
    });
    return res.data;
  } catch (error) {
    if (error.response) throw error.response.data;
    throw error.message;
  }
};

export default callApi;
