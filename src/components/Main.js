import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from './Map.js';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import LeftPanel from './LeftPanel.js';

const fetch = require('node-fetch');

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
  const params = useParams();
  const { axis, location } = params;

  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {axis: axes[newValue]}));
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await fetch('/data/latest.json', {method: 'GET'})
        .then(res => res.json())
        .then((data) => { setData(data, []) })
    }
    fetchData();

  }, []);


  return (

    <Grid container className="the-grid">
      <Grid key="left-sidebar" className={"left-sidebar"} item xs={4}>
        <LeftPanel location={location} data={data}/>
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

        <Map axis={axis} data={data} />
      </Grid>
    </Grid>
  );
}

export default Main;

