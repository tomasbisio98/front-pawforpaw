import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axiosApiBack.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosApiBack;
