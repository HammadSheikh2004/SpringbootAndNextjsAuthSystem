import axios from "axios";
import { LoginFormData } from "../utils/validationSchema";
import { store } from "../redux/store";
import { logout, setToken } from "../redux/slice/authSlice";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_PUBLIC_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  config => {
    const state = store.getState();
    const token = state.auth.token;
    console.log("API token: ", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

type FailedRequest = {
  resolve: (token: string | null) => void;
  reject: (error: unknown) => void;
};

let isRefreshing = false;
let failedQueue: FailedRequest[] = [];

const processQueue = (error: unknown, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (!error.response) {
      return Promise.reject(error);
    }
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/api/auth/refreshToken") &&
      !originalRequest.url.includes("/api/auth/me")
    ) {
      originalRequest._retry = true;
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(token => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch(err => {
            Promise.reject(err);
          });
      }
      isRefreshing = true;
      try {
        const refreshResponse = await api.post(
          "/api/auth/refreshToken",
          {},
          { withCredentials: true },
        );
        const newToken = refreshResponse.data.token;

        store.dispatch(setToken(newToken));
        processQueue(null, newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (error) {
        processQueue(error, null);
        store.dispatch(logout());

        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }
    return Promise.reject(error);
  },
);

export const login = async (data: LoginFormData) => {
  try {
    const response = await api.post("/api/auth/login", data);
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export default api;
