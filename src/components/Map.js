
import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";

const geoUrl = '/states-map.json';
const zeroColor = '#BBD0E6';
const minColor = '#E2C065';
const maxColor = '#CC0000';

let focusedStatePath;

const MapChart = (props) => {
  const { axis, data } = props;

  const history = useHistory();
  const params = useParams();
  const {location} = params;

  function focusState(geo, path){
    if (focusedStatePath) {
      focusedStatePath.style='';
    }
    path.style='stroke:#660000';
    focusedStatePath = path;
  }

  function handleStateClick(e, geography){
    const path = e.currentTarget;
    //focusState(geography, path);
    history.push(updateUrl(params, {location: geography.properties.name.toLowerCase()}));
  }

  const days = data ?
    data.dates.length :
    0;

  const max = data ?
    Math.max(...Object.entries(data.states).map(o => o[1][axis][days-1]), 0) : 0;

  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  return (
    <>
      { data == null ?
        <div>loading</div> :
        <>
          <ComposableMap projection="geoAlbersUsa">
            <Geographies geography={geoUrl}>
              {({ geographies }) =>

                geographies.map(geo => {
                  const cur = data.states ? data.states[geo.id] : {}
                  console.log(cur);
                  return (
                    <Geography
                      onClick={(e) => handleStateClick(e, geo)}
                      className={cur.name.toLowerCase() === location ? 'focused-state' : ''}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        ( cur[axis][days-1] === 0) ?
                          zeroColor :
                          colorScale(cur[axis][days-1])
                        }
                    />
                  );
                })

              }
            </Geographies>
          </ComposableMap>
          <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
        </>
      }
    </>
  );
};

export default MapChart;
