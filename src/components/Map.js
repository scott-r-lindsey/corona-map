
import React, { useState, useLayoutEffect } from "react";

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import { scaleLog } from "d3-scale";
import Scale from './Scale.js';
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";

const geoUrl = '/states-map.json';
const zeroColor = '#AAA67A';
const minColor = '#E2C065';
const maxColor = '#CC0000';

const MapChart = (props) => {
  const { when, axis, data } = props;
  const [position, setPosition] = useState({coordinates: [0,0], zoom:1 });

  const [mapDims, setMapDims] = useState({x: 800, y: 800, scale: 1000});

  const history = useHistory();
  const params = useParams();
  const {location} = params;
  const offset = (when === 'now') ? -1 : when -1;

  const zoomableRef = React.createRef();
  let timeoutId = null;

  const setMapSize = () => {
    if (zoomableRef.current) {
      setMapDims({
        x: zoomableRef.current.clientWidth,
        y: zoomableRef.current.clientHeight,
        scale: 1000 * (zoomableRef.current.clientWidth / 800)
      });
    }
  }

  /*eslint-disable */
  useLayoutEffect(() => {
    setMapSize();
  }, []);
  /*eslint-enable */

  const resizeListener = () => {
    // prevent execution of previous setTimeout
    clearTimeout(timeoutId);
    // change width from the state object after 150 milliseconds
    timeoutId = setTimeout(() => setMapSize(), 150);
  };

  window.addEventListener('resize', resizeListener);

  function handleStateClick(e, geography){
    history.push(updateUrl(params, {location: geography.properties.name.toLowerCase()}));
  }

  function handleMoveEnd(position) {
    setPosition(position);
  }

  const days = data.dates.length;

  const max =
    Math.max(...Object.entries(data.states).map(o => o[1][axis][days-1]), 0);

  const colorScale = scaleLog()
    .domain([1, max])
    .range([ minColor, maxColor ]);

  return (
    <div ref={zoomableRef} style={{height:'100%',width:'100%'}}>
      <div className={"map-scale"}>
        <Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
      </div>
      <ComposableMap
        projectionConfig={{
          scale: mapDims.scale,
        }}
        width={mapDims.x}
        height={mapDims.y}
        projection="geoAlbersUsa"
        style={{ width: mapDims.x, height: mapDims.y }}
      >
        <ZoomableGroup
          zoom={position.zoom}
          center={position.coordinates}
          onMoveEnd={handleMoveEnd}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>

              geographies.map(geo => {
                const cur = data.states ? data.states[geo.id] : {}
                return (
                  <Geography
                    onClick={(e) => handleStateClick(e, geo)}
                    className={cur.name.toLowerCase() === location ? 'focused-state' : ''}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      ( cur[axis][days + offset] === 0) ?
                        zeroColor :
                        colorScale(cur[axis][days + offset])
                      }
                  />
                );
              })

            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};

export default MapChart;
          //<Scale {...{max, zeroColor, minColor, maxColor, colorScale}} />
