import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./CurrentUserContext";

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <CurrentUserProvider>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
