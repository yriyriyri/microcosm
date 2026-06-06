import axios from "axios";
import { VOXL_AUTH_API_URL } from "./env";
import { getStoredAuthentication, clearAuthentication } from "@/components/Auth/state";

export const authClient = axios.create({
  baseURL: VOXL_AUTH_API_URL,
});

authClient.interceptors.request.use(
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

authClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== "undefined" && error.response?.status === 401) {
      clearAuthentication();
    }

    return Promise.reject(error);
  }
);