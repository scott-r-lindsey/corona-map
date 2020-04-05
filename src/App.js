import React, { useState, useEffect } from 'react';
import './styles/App.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Link } from "react-router-dom";
import Main from './components/Main.js';
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

const home = '/COVID-US/now/confirmed/united%20states';

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
            <AppBar position="static" className={"main-appbar"}>
              <Toolbar variant="dense" className={"main-toolbar"}>
                <Link to={home}>
                  <img src="/img/covid-19-100.png" alt="corona-virus" />
                  <span className={"logo"}>
                    COVID-VIR.US
                  </span>
                </Link>

              </Toolbar>
            </AppBar>
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
