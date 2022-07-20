import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";

// Load the audience, clientId, and domain from .env for 
// connecting with Auth0 (note if adding new, needs REACT_)
const audience = process.env.REACT_APP_AUTH0_AUDIENCE //THIS NEEDS A "/" AT THE END!
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID
const domain = process.env.REACT_APP_AUTH0_DOMAIN

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} audience={audience} redirectUri={window.location.origin}>
      <App />
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
