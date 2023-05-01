import React, { Suspense } from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { CurrentUserProvider } from "./CurrentUserContext";
import "./i18n";
import SpinnerLoading from "./SpinnerLoading";

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
        <Suspense fallback={<SpinnerLoading />}>
          <App />
        </Suspense>
      </Auth0Provider>
    </CurrentUserProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
