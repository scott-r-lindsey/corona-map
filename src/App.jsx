import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
} from 'react-router-dom';
import { home } from './lib/config';
import { primary, secondary } from './lib/colors';
import TrackedRoute from './components/TrackedRoute';
import RouteValidator from './components/RouteValidator';
import { embellishData } from './lib/getMapValue';
import Veil from './components/Veil';
import VeilContext from './context/Veil';

const fetch = require('node-fetch');

const dataUrl = '/data/full.json';

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
    secondary: { main: secondary },
  },
  status: {
    danger: 'orange',
  },
});

function App() {
  const [data, setData] = useState(null);
  const [veil, setVeil] = useState(false);

  useEffect(() => {
    (async () => {
      await fetch(dataUrl, { method: 'GET' })
        .then((res) => res.json())
        .then((parsed) => {
          embellishData(parsed.state);
          embellishData(parsed.county);
          setData(parsed, []);
        });
    })();
  }, []);

  return (
    <>
      { data
        ? (
          <ThemeProvider theme={theme}>
            <VeilContext.Provider value={{ veil, setVeil }}>
              <Router>
                <Switch>
                  <TrackedRoute path="/:mode/:when/:axis/:quant/:location">
                    <RouteValidator data={data} />
                  </TrackedRoute>
                  <TrackedRoute path="/">
                    <Redirect to={home} />
                  </TrackedRoute>
                </Switch>
              </Router>
              <Veil />
            </VeilContext.Provider>
          </ThemeProvider>
        )
        : (
          <div style={{
            backgroundColor: primary,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <div className="loading-animation">
              <div />
              <div />
              <div />
            </div>
          </div>
        )}
    </>
  );
}

export default App;
