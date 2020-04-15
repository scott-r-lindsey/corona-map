import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { home } from './lib/config.js';
import { primary, secondary} from './lib/colors.js';
import TrackedRoute from './components/TrackedRoute.js';
import RouteValidator from './components/RouteValidator.js';
import { embellishData } from './lib/getMapValue.js';

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
} from "react-router-dom";

const fetch = require('node-fetch');
const dataUrl = '/data/latestfull.json';

const breakpoints = {
  xs: 0,
  sm: 680,
  md: 1060,
  lg: 1280,
  xl: 1920,
};

const theme = createMuiTheme({
  breakpoints: { values: breakpoints },
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
        .then((data) => {
            setData(embellishData(data), [])
        })
    })();
  }, []);

  return (
    <>
      { data ?
        <ThemeProvider theme={theme}>
          <Router>
            <Switch>
              <TrackedRoute path="/COVID-US/:when/:axis/:quant/:location">
                <RouteValidator data={data}/>
              </TrackedRoute>
              <TrackedRoute path="/">
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
