import axios from "axios";
import { store } from "stores/store";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BE_URL,
});

instance.defaults.withCredentials = true;
instance.defaults.headers.common["Authorization"] = `Bearer ${
  store.getState().auth.value.accessToken
}`;

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
