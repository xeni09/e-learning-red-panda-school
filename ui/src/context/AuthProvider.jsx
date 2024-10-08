import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import AuthContext from './AuthContext';
import axios from '../services/axiosConfig'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation(); // Get current route

  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/my-account', '/admin']; // Define your protected routes

    const verifyUserToken = async () => {
      try {
        const response = await axios.get('/api/auth/verifyToken', { withCredentials: true });
        if (response.data && response.data.user) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          handleInvalidToken();
        }
      } catch (error) {
        console.error('User verification failed:', error);
        handleInvalidToken();
      } finally {
        setIsLoading(false);
      }
    };

    // Only verify token if the user is on a protected route
    if (protectedRoutes.includes(location.pathname)) {
      verifyUserToken();
    } else {
      setIsLoading(false); // For public routes, stop loading immediately
    }
  }, [location.pathname]);

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);  // Ensure the loading stops if token is invalid
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');  // Backend handles clearing cookies
      handleInvalidToken();  // Clear user data on successful logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Función para actualizar el usuario sin volver a hacer una petición
  const updateUserState = (updatedUserData) => {
    setUser(updatedUserData);  // Actualiza el estado local del usuario
  };

  // Función para solicitar al backend los datos más recientes del usuario
  const updateUser = async () => {
    try {
      const response = await axios.get('/api/auth/verifyToken', { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);  // Actualiza el estado global de user
        return response.data.user;  // Asegura que devuelve el usuario actualizado
      } else {
        handleInvalidToken();  // Manejo del caso de token inválido
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
      handleInvalidToken();
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, updateUser, updateUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
