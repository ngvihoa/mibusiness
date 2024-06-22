import axios from "axios";
import { store } from "src/redux/store";

// console.log(state.accessToken);

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
});

// Allow cookie setting from server
instance.defaults.withCredentials = true;

// Alter defaults after instance has been created
instance.defaults.headers.common["Authorization"] = `Bearer ${
  store.getState().auth.value.accessToken
}`;

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
    // we can handle global errors here
    return Promise.reject(error);
  }
);

export default instance;
