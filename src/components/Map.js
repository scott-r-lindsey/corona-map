
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

const MapChart = (props) => {
  const { axis, data } = props;

  const history = useHistory();
  const params = useParams();

  const handleStateClick = geography => () => {
    history.push(updateUrl(params, {location: geography.name.toLowerCase()}));
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
                  return (
                    <Geography
                      onClick={handleStateClick(geo.properties)}
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
