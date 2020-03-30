import React from 'react';
import Grid from '@material-ui/core/Grid';
import Map from './Map.js';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useParams, useHistory } from "react-router-dom";

function Main() {

  const axes = [
    'confirmed',
    'deaths',
  ];
  const axesByName = {
    'confirmed': 0,
    'deaths': 1
  }

  const history = useHistory();

  const handleChange = (event, newValue) => {
    history.push('/COVID-US/now/' + axes[newValue] + '/us');
  };

  const { axis } = useParams();

  return (

    <Grid container className="the-grid">
      <Grid key="left-sidebar" className={"left-sidebar"} item xs={4}>
        I am a thing on the left

      </Grid>
      <Grid key="main-panel" className={"main-panel"} item xs={8}>

        <AppBar position="static">
          <Tabs value={axesByName[axis]} aria-label="Data Type" onChange={handleChange} >
            {
              axes.map((value, index) => {
                return(
                  <Tab key={value} label={value} />
                );
              })
            }
          </Tabs>
        </AppBar>

        <Map axis={axis} />
      </Grid>
    </Grid>
  );
}

export default Main;

