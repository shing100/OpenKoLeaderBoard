import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { ThemeProvider } from "@/components/theme-provider";
import "./i18n";

import { TempoDevtools } from "tempo-devtools";
TempoDevtools.init();

const basename = import.meta.env.BASE_URL;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="ui-theme">
      <Auth0Provider
        domain="YOUR_AUTH0_DOMAIN"
        clientId="YOUR_AUTH0_CLIENT_ID"
        authorizationParams={{
          redirect_uri: window.location.origin,
        }}
        useRefreshTokens
        cacheLocation="localstorage"
      >
        <BrowserRouter basename={basename}>
          <App />
        </BrowserRouter>
      </Auth0Provider>
    </ThemeProvider>
  </React.StrictMode>,
);
