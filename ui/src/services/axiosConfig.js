import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Create an instance of Axios
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor for handling authentication errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized, redirecting to login...");
      const protectedRoutes = ["/dashboard", "/my-account", "/admin"];

      // Only redirect if you're on a protected route
      if (protectedRoutes.includes(window.location.pathname)) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
