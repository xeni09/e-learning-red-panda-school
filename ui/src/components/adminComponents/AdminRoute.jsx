import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';

const AdminRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p></p>;
  }

  // Check if the user has the admin role
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  // Render children if the user is an admin
  return children;
};

export default AdminRoute;
