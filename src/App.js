import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from "./Routes";

function App() {

  const [isAuthenticated, userHasAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes  appProps={{ isAuthenticated, userHasAuthenticated }}/>
      </div>
    </Router>
  );
}

export default App;
