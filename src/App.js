import React from 'react';
import './styles/App.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Main from './components/Main.js';
import Footer from './components/Footer.js';

import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

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

  return (
    <>
      <ThemeProvider theme={theme}>
        <AppBar position="static" className={"main-appbar"}>
          <Toolbar variant="dense" className={"main-toolbar"}>
            <img src="/img/covid-19-100.png" alt="corona-virus" />
            <span className={"logo"}>
              COVID-VIR.US
            </span>
          </Toolbar>
        </AppBar>
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
        <Footer/>
      </ThemeProvider>
    </>
  );
}

export default App;


// /now/confirmed/us
