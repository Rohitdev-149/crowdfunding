import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AUTH_KEY = "crowdfund_auth";

export const AuthProvider = ({ children }) => {
  // Load auth state from localStorage on initial render
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem(AUTH_KEY);
    return savedAuth ? JSON.parse(savedAuth) : false;
  });
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("crowdfund_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save auth state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(AUTH_KEY, JSON.stringify(isAuthenticated));
    if (user) {
      localStorage.setItem("crowdfund_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("crowdfund_user");
    }
  }, [isAuthenticated, user]);

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    // Clear any auth-related data from localStorage
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem("crowdfund_user");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
