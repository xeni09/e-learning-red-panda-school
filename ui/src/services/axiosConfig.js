import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

// Crear una instancia de Axios
const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

// Interceptor para manejar errores de autenticación
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized: ", error.response.data);
      // Aquí podrías agregar alguna lógica para desloguear si el token está expirado
      // Por ejemplo, podrías llamar a una función de logout del contexto de autenticación
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
