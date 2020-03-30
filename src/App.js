import React from 'react';
import './styles/App.scss';

import Main from './components/Main.js';

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {

  return (
    <Router>
      <Switch>
        <Route path="/COVID-US/:when/:axis/:location">
          <Main />
        </Route>
        <Route exact path="/">
          <Redirect to='/COVID-US/now/confirmed/us' />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;


// /now/confirmed/us
