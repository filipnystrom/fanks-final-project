import React, { Fragment } from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Auth0Provider } from '@auth0/auth0-react';
import { BrowserRouter } from 'react-router-dom';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Auth0Provider
      domain="dev-st2da53qpl0uf3eg.eu.auth0.com"
      clientId="Ars0xRshCRwk04xQfH4Tlvl9V5eIeZ0g"
      redirectUri={window.location.origin}>
          <App />
      </Auth0Provider>
    </BrowserRouter>
  </StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
