
import React, { useState, useLayoutEffect } from "react";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import {zeroColor} from '../lib/colors.js';
import MapTooltip from './MapTooltip.js';
import { getLocationDataForDay } from '../lib/getMapValue.js';

const geoUrl = '/states-map.json';

const MapChart = (props) => {
  const { when, axis, data, colorScale } = props;
  const [mapDims, setMapDims] = useState({x: 800, y: 800, scale: 1000});
  const history = useHistory();
  const params = useParams();
  const {location} = params;
  const offset = (when === 'now') ? -1 : when -1;
  const days = data.dates.length;

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

  // debounced changes while resizing
  const resizeListener = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => setMapSize(), 150);
  };

  const touch = ("ontouchstart" in document.documentElement);

  window.addEventListener('resize', resizeListener);

  const [toolTipData, setToolTipData] = useState({left: 0, top:0, data: {}, show:false});

  function handleMouseEnter(e, geography){
    const el = zoomableRef.current;
    const rect = el.getBoundingClientRect();

    const toolTipData = getLocationDataForDay(
      data, when, geography.properties.name.toLowerCase());

    setToolTipData({
      left: e.clientX - rect.left,
      top:e.clientY - rect.top,
      data: toolTipData,
      show:true
    });
  }
  function handleMouseMove(e, geography){
    const el = zoomableRef.current;
    const rect = el.getBoundingClientRect();

    const toolTipData = getLocationDataForDay(
      data, when, geography.properties.name.toLowerCase());

    setToolTipData({
      left: e.clientX - rect.left,
      top:e.clientY - rect.top,
      data: toolTipData,
      show:true
    });
  }
  function handleMouseLeave(e, geography){
    setToolTipData({left: 0, top:0, data: {}, show:false});
  }

  function handleStateClick(e, geography){
    history.push(updateUrl(params, {location: geography.properties.name.toLowerCase()}));
  }

  return (
    <>
      <div ref={zoomableRef} style={{height:'100%',width:'100%'}} className={"map-panel"}>
        { touch ?
          null :
          <MapTooltip
            left={toolTipData.left}
            top={toolTipData.top}
            show={toolTipData.show}
            data={toolTipData.data}
          />
        }
        <ComposableMap
          projectionConfig={{
            scale: mapDims.scale,
          }}
          width={mapDims.x}
          height={mapDims.y}
          projection="geoAlbersUsa"
          style={{ width: mapDims.x, height: mapDims.y }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>

              geographies.map(geo => {
                const cur = data.states ? data.states[geo.id] : {}
                return (
                  <Geography
                    onClick={(e) => handleStateClick(e, geo)}
                    onMouseEnter={(e) => handleMouseEnter(e, geo)}
                    onMouseLeave={(e) => handleMouseLeave(e, geo)}
                    onMouseMove={(e) => handleMouseMove(e, geo)}
                    className={cur.name.toLowerCase() === location ? 'focused-state' : ''}
                    key={geo.rsmKey}
                    geography={geo}
                    fill={
                      ( cur.series[axis][days + offset] === 0) ?
                        zeroColor :
                        colorScale(cur.series[axis][days + offset])
                      }
                  />
                );
              })

            }
          </Geographies>
        </ComposableMap>
      </div>
    </>
  );
};

export default MapChart;
