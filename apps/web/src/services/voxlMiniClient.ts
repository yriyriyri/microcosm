import axios from "axios";
import { getStoredAuthentication, clearAuthentication } from "@/components/Auth/state";
import { VOXL_API_URL } from "./env";

export const voxlMiniClient = axios.create({
  baseURL: VOXL_API_URL || "",
});

voxlMiniClient.interceptors.request.use(
  (config) => {
    const auth = getStoredAuthentication();

    if (auth.isAuthenticated && auth.accessToken) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${auth.accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

voxlMiniClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      clearAuthentication();
    }

    return Promise.reject(error);
  }
);
