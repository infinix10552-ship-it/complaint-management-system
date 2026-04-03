import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import LandingPage from './pages/LandingPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 20, color: 'red'}}><h1>Error</h1><pre>{this.state.error.message}</pre><pre>{this.state.error.stack}</pre></div>;
    }
    return this.props.children; 
  }
}

// Component to decide where to go
const IndexRoute = () => {
  const { user } = useAuth();
  if (user) {
    return user.role === 'ADMIN' ? <Navigate to="/admin" /> : <Navigate to="/dashboard" />;
  }
  return (
    <ErrorBoundary>
      <LandingPage />
    </ErrorBoundary>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<IndexRoute />} />
          
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