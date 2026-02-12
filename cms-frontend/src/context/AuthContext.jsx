import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Your UserService.java puts "id" and "role" into claims
        setUser({
          id: decoded.id,
          role: decoded.role,
          sub: decoded.sub // email
        });
      } catch (error) {
        console.error("Invalid Token");
        localStorage.removeItem('jwt_token');
      }
    }
    setLoading(false);
  }, []);

  const loginUser = (token) => {
    localStorage.setItem('jwt_token', token);
    const decoded = jwtDecode(token);
    setUser({
      id: decoded.id,
      role: decoded.role,
      sub: decoded.sub
    });
  };

  const logoutUser = () => {
    localStorage.removeItem('jwt_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);