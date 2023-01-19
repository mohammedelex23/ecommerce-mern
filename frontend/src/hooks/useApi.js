import { useEffect, useState } from "react";
import axios from "axios";

export default function useApi(url) {
  const [values, setValues] = useState({
    isLoading: false,
    isError: false,
    errors: null,
    data: [],
  });

  const callApi = async function () {
    setValues({
      ...values,
      isLoading: true,
      isError: false,
      data: [],
    });
    try {
      let res = await axios.get(url);
      console.log(res.data);

      setValues({
        ...values,
        isLoading: false,
        isError: false,
        data: res.data,
      });
    } catch (error) {
      setValues({
        ...values,
        isLoading: false,
        isError: true,
        errors: error,
        data: [],
      });
    }
  };
  useEffect(() => {
    callApi()
  }, [url]);

  return { values, callApi };
}
