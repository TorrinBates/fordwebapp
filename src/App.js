import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes";
import { Auth } from 'aws-amplify';

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  Auth.currentAuthenticatedUser({
    bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
  }).then(user => console.log(user))

  return (
    <Router>
      <div className="App">
        <div>
          isA:    { isAuthenticated.toString() }
        </div>
        <Routes  appProps={{ isAuthenticated, userHasAuthenticated }}/>
      </div>
    </Router>
  );
}

export default App;
