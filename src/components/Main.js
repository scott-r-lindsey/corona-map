import React, { useState, useEffect } from 'react';
import Map from './Map.js';
import { useParams } from "react-router-dom";
import LeftPanel from './LeftPanel.js';
import MapSlider from './MapSlider.js';
import BottomAd from './BottomAd.js';

const fetch = require('node-fetch');
const dataUrl = '/data/latestfull.json';

function Main() {

  const params = useParams();
  const { when, axis, location } = params;

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
    <>
      <div className={"d-left-column"}>
        { data ?
          <LeftPanel location={location} data={data}/> :
          <div>Loading...</div>
        }
      </div>
      <div className={"d-main-panel"}>
        { data ?
          <>
            <Map when={when} axis={axis} data={data} />
            <MapSlider data={data} />
          </> :
          <div></div>
        }
      </div>
      <div className={'d-main-footer'}>
        <BottomAd />
      </div>
    </>

  );
}

export default Main;


