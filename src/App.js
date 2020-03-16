import React, { useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes";
import { Auth } from 'aws-amplify';

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
    <Router>
      <div className="App">
        <Routes  appProps={{ isAuthenticated, userHasAuthenticated }}/>
      </div>
    </Router>
  );
}

export default App;
