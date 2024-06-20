import axios from "axios";
import { toast } from "react-toastify";

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
});

// Allow cookie setting from server
instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = "AUTH_TOKEN";

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    const status = error.response?.status || 500;
    // we can handle global errors here
    switch (status) {
      // authentication (token related issues)
      case 401: {
        toast.error("Unauthorized access. Please login!");
        break;
      }

      // forbidden (permission related issues)
      case 403: {
        toast.error("No permission to access the resources!");
        break;
      }

      // bad request
      case 400: {
        break;
      }

      // not found
      case 404: {
        toast.error("Not found resources!");
        break;
      }

      // conflict
      case 409: {
        break;
      }

      // unprocessable
      case 422: {
        break;
      }

      // generic api error (server related) unexpected
      default: {
        toast.error("Server error!");
        break;
      }
    }
    return null;
  }
);

export default instance;
