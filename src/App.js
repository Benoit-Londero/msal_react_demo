import React from 'react';

import Grid from "@mui/material/Grid";
import { PageLayout } from "./components/PageLayout";
import  {Routes, Route} from "react-router-dom";

import {Home} from "./pages/Home";
import {Profile} from "./pages/Profile";

import { MsalProvider, useMsal, useIsAuthenticated} from "@azure/msal-react";
import { useEffect } from 'react';

const Pages = () => {
  const {instance} = useMsal();
  const IsAuthenticated = useIsAuthenticated();

  useEffect(() =>{
    if (IsAuthenticated) {
      instance.ssoSilent({
        scopes: ['user.read'],
        loginHint: ""
      }).then((response) => {
          instance.setActiveAccount(response.account);
      }).catch((error) => console.log(error));
    }
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  )
}

function App({msalInstance}) {
  return (
    <MsalProvider instance={msalInstance}>
      <PageLayout>
        <Grid container justifyContent="center">
          <Pages />
        </Grid>    
      </PageLayout>
    </MsalProvider>
  );


}

export default App;
