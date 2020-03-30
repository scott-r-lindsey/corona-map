
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';

const fetch = require('node-fetch');
const geoUrl = '/states-map.json';

const zeroColor = '#BBD0E6';
const minColor = '#E2C065';
const maxColor = '#CC0000';

const MapChart = (props) => {
  const { axis } = props;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      await fetch('/data/latest.json', {method: 'GET'})
        .then(res => res.json())
        .then((data) => { setData(data, []) })
    }
    fetchData();

  }, []);

  const handleStateClick = geography => () => {
    console.log(geography);
  }

  const max = data.states ?
    Math.max(...Object.entries(data.states).map(o => o[1][axis]), 0) : 0;


  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>

            geographies.map(geo => {
              const cur = data.states ? data.states[geo.id] : {}
              return (
                <Geography
                  onClick={handleStateClick(geo.properties)}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={( cur[axis] === 0) ? zeroColor : colorScale(cur[axis])}
                />
              );
            })

          }
        </Geographies>
      </ComposableMap>
      <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
    </>
  );
};

export default MapChart;




//https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json
