import React from 'react';
import './App.css';
import SignIn from './signin';
import LoggedIn from './loggedin';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
          <Route path="/login" component={SignIn}/>
          <Route path="/dashboard" component={LoggedIn}/>
      </div>
    </Router>
  );
}

export default App;
