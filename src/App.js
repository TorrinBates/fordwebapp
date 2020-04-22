import React, { useState, useEffect } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes";
import { Auth } from 'aws-amplify';

/*
Paret component.  
Contains method for handling authentication for the entire app.
*/
function App() {

  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthenticated, userHasAuthenticated] = useState(false);

  useEffect(() => {onload();}, []);

  async function onload()
  {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {

    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <Router>
      <div>
        <Routes  appProps={{ isAuthenticated, userHasAuthenticated }}/>
      </div>
    </Router>
  );
}

export default App;
