import React, { useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext';
import axios from '../services/axiosConfig'; 

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Revisar si el estado está almacenado en localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true'; // Si no existe, por defecto a `false`
  });

  const [user, setUser] = useState(() => {
    // Revisar si el usuario está almacenado en localStorage
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [isLoading, setIsLoading] = useState(!isAuthenticated); // Solo mostrar el loading si no está autenticado

  useEffect(() => {
    if (!isAuthenticated) {
      const verifyUserToken = async () => {
        try {
          const response = await axios.get('/api/auth/verifyToken', { withCredentials: true });
          if (response.data && response.data.user) {
            setUser(response.data.user);
            setIsAuthenticated(true);
            localStorage.setItem('user', JSON.stringify(response.data.user)); // Guardar usuario en localStorage
            localStorage.setItem('isAuthenticated', 'true'); // Guardar estado de autenticación
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
      verifyUserToken();
    } else {
      setIsLoading(false); // Ya está autenticado, no hay que mostrar la carga
    }
  }, [isAuthenticated]);

  const handleInvalidToken = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.setItem('isAuthenticated', 'false');
    setIsLoading(false);
  };

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData)); // Guardar usuario en localStorage
    localStorage.setItem('isAuthenticated', 'true'); // Actualizar autenticación
  };

  const logout = async () => {
    try {
      await axios.post('/api/auth/logout');  // Backend maneja la limpieza de cookies
      handleInvalidToken();  // Limpia los datos del usuario al cerrar sesión correctamente
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const updateUser = async () => {
    try {
      const response = await axios.get('/api/auth/verifyToken', { withCredentials: true });
      if (response.data && response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        return response.data.user;
      } else {
        handleInvalidToken();
      }
    } catch (error) {
      console.error('Failed to update user data:', error);
      handleInvalidToken();
    }
  };

  const updateUserState = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('user', JSON.stringify(updatedUserData)); // Actualizar usuario en localStorage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, isLoading, login, logout, updateUser, updateUserState }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
