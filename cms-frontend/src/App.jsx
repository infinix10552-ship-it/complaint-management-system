import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';

// Component to decide where to go if user is already logged in
const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  return user.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<DashboardRedirect />} />
          
          <Route path="/dashboard" element={
            <PrivateRoute requiredRole="USER">
              <UserDashboard />
            </PrivateRoute>
          } />
          
          <Route path="/admin" element={
            <PrivateRoute requiredRole="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;