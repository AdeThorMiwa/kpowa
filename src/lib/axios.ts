import axios from "axios";
import {
  APP_EVENTS,
  AUTH_STORAGE_KEY,
  AUTH_STORAGE_TYPE,
} from "../constants/auth";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8009",
});

axiosInstance.interceptors.request.use((config) => {
  const token = AUTH_STORAGE_TYPE.getItem(AUTH_STORAGE_KEY);
  if (token && token !== "undefined") {
    config.headers["Authorization"] = `Bearer ${JSON.parse(token)}`;
  }
  return config;
}, Promise.reject);

axiosInstance.interceptors.response.use(
  (c) => c,
  (error) => {
    if (error.response.status === 401) {
      window.dispatchEvent(new CustomEvent(APP_EVENTS.LOGOUT));
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
