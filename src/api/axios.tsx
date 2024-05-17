import axios from "axios";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL as string,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      // Handle network/server errors
      // alert("Server is not responding or network error occurred.");
      history.push("/server-error");
    }
    // Handle other types of errors (status codes, etc.)
    return Promise.reject(error);
  }
);

export default axiosInstance;
