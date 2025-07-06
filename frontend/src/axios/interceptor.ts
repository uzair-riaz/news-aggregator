import { UNAUTHENTICATED } from "@/constants";
import axios from "axios";
import storage from "redux-persist/lib/storage";

// Response interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error?.response?.status === UNAUTHENTICATED.code ||
      error?.response.data.message === UNAUTHENTICATED.message
    ) {
      localStorage.clear();
      storage.removeItem("persist:root");
    }
    return Promise.reject(error);
  }
);

export default axios;
