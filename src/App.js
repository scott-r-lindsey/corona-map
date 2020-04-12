import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Main from './components/index.js';
import { home } from './lib/config.js';
import { primary, secondary} from './lib/colors.js';
import TrackedRoute from './components/TrackedRoute.js';

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

const fetch = require('node-fetch');
const dataUrl = '/data/latestfull.json';

const theme = createMuiTheme({
  palette: {
    primary: { main: primary },
    secondary: { main: secondary }
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
              <TrackedRoute path="/COVID-US/:when/:axis/:location">
                <Main data={data}/>
              </TrackedRoute>
              <TrackedRoute exact path="/">
                <Redirect to={home}/>
              </TrackedRoute>
            </Switch>
          </Router>
        </ThemeProvider> :
        <div>Loading...</div>
      }
    </>
  );
}

export default App;
