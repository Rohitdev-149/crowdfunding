import { createContext, useContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout: auth0Logout,
    user,
  } = useAuth0();

  const login = () => {
    loginWithRedirect();
  };

  const logout = () => {
    auth0Logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
