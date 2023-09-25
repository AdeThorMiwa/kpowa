import axios from "axios";
import { AUTH_STORAGE_KEY, AUTH_STORAGE_TYPE } from "../constants/auth";

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
      AUTH_STORAGE_TYPE.removeItem(AUTH_STORAGE_KEY);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;