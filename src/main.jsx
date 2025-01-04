import React from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { ProjectProvider } from "./context/ProjectContext";
import App from "./App";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-xd7vfhc5hj7mxldy.us.auth0.com"
      clientId="yk3QcDLPdf2p3wfUOITj7BR5dbsEUyGr"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <ProjectProvider>
        <App />
      </ProjectProvider>
    </Auth0Provider>
  </React.StrictMode>
);
