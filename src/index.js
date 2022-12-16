import React from 'react';
import ReactDOM from 'react-dom/client';

import {ThemeProvider} from '@mui/material/styles';
import { theme } from "./styles/theme";

import App from './App';

import {BrowserRouter} from "react-router-dom";

import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
    clientId: 'aef2a9a8-86e2-44f5-89c3-165a47082917',
    authority: 'https://login.microsoftonline.com/89cd3d54-4149-4b03-a06f-1e4526d82250',
    redirectUri: 'https://msal.ahgency.be/',
  }
})

pca.addEventCallback(event => {
  if(event.eventType === EventType.LOGIN_SUCCESS){
    console.log(event);
    pca.setActiveAccount(event.payload.account);
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App msalInstance={pca}/>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

