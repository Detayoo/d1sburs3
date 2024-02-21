import axios from "axios";
import { toast } from "react-toastify";

import { config } from "@/config";

export const baseApi = axios.create({
  baseURL: config.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const authenticatedApi = (): any => {
  const token = localStorage.getItem("TOKEN");
  const instance = axios.create({
    baseURL: config.SERVER_URL,
    headers: {
      "ngrok-skip-browser-warning": "any",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  instance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      // const originalConfig = err.config;

      if (err?.response?.status === 401) {
        if (typeof window !== undefined) {
          toast.error("You are not authenticated, please login");
          localStorage.clear();
          window.location.replace("/");
          return;
        }
      }

      // if (err?.response?.status === '401' && !originalConfig?._retry) {
      //     originalConfig._retry = true;
      //     try {

      //     } catch (error) {
      //         if (error?.response?.data) {
      //             return Promise.reject(error?.response?.data);
      //         }

      //         return Promise.reject(error);
      //     }
      // }

      return Promise.reject(err);
    }
  );

  return instance;
};
