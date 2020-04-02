import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Map from './Map.js';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import LeftPanel from './LeftPanel.js';
import MapSlider from './MapSlider.js';


const fetch = require('node-fetch');
const dataUrl = '/data/latestfull.json';

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
  const { when, axis, location } = params;

  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {axis: axes[newValue]}));
  };

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await fetch(dataUrl, {method: 'GET'})
        .then(res => res.json())
        .then((data) => { setData(data, []) })
    }
    fetchData();

  }, []);


  return (

    <Grid container className="the-grid">
      <Grid key="left-sidebar" className={"left-sidebar"} item xs={4}>
        { data ?
          location !== 'us' ?
            <LeftPanel location={location} data={data}/> :
            <div>click a state</div> :
          <div>Loading...</div>
        }
      </Grid>
      <Grid key="main-panel" className={"main-panel"} item xs={8}>
        { data ?
          <Map when={when} axis={axis} data={data} /> :
          <div>Loading...</div>
        }
        { data ?
          <div className={'map-slider'}>
            <MapSlider data={data} />
          </div> :
          <div></div>
        }
      </Grid>
    </Grid>
  );
}

export default Main;


/*

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
*/
