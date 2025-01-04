import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

import "./Auth.css";

const SignIn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const from = location.state?.from || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  return (
    <div className="auth-page">
      <div className="auth-container">
        {isAuthenticated ? (
          <>
            <div className="welcome-section">
              <h2>Welcome, {user?.name}!</h2>
              <Profile />
              <button
                onClick={() => logout({ returnTo: window.location.origin })}
                className="logout-button"
              >
                Sign Out
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Sign In to Create Project</h2>
            <button
              onClick={() => loginWithRedirect()}
              className="login-button"
            >
              Sign In with Auth0
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;
