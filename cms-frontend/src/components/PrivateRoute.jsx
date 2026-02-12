import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // Redirect unauthorized access to appropriate dashboard
    return user.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
  }

  return children;
};

export default PrivateRoute;