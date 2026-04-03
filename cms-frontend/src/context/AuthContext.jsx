import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem('jwt_token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        return {
          id: decoded.id,
          role: decoded.role,
          sub: decoded.sub
        };
      } catch {
        localStorage.removeItem('jwt_token');
        return null;
      }
    }
    return null;
  });
  const [loading] = useState(false);

  // Initial user check is now handled in state initializer
  useEffect(() => {
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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);