// src/lib/axiosApiBack.ts

import axios from "axios";

const axiosApiBack = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

// 🔍 Interceptor para agregar el token y ver los headers SOLO en cliente
if (typeof window !== "undefined") {
  axiosApiBack.interceptors.request.use((config) => {
    const auth = localStorage.getItem("auth");
    if (auth) {
      const { token } = JSON.parse(auth);
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default axiosApiBack;