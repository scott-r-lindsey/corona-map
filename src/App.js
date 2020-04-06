import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Main from './components/Main.js';
import { home } from './lib/config.js';

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const fetch = require('node-fetch');
const dataUrl = '/data/latestfull.json';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#424242' },
    secondary: { main: '#FF5722' }
  },
  status: {
    danger: 'orange',
  },
});

function App() {

  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      await fetch(dataUrl, {method: 'GET'})
        .then(res => res.json())
        .then((data) => { setData(data, []) })
    })();
  }, []);

  return (
    <>
      { data ?
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <Route path="/COVID-US/:when/:axis/:location">
                <Main data={data}/>
              </Route>
              <Route exact path="/">
                <Redirect to={home}/>
              </Route>
            </Switch>
          </Router>
        </ThemeProvider> :
        <div>Loading...</div>
      }
    </>
  );
}

export default App;
