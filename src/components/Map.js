
import React, { useState, useLayoutEffect } from "react";

import { ComposableMap, Geographies, Geography, ZoomableGroup } from "react-simple-maps";
import updateUrl from '../lib/mapUrl.js';
import { useParams, useHistory } from "react-router-dom";
import {zeroColor} from '../lib/colors.js';
import MapTooltip from './MapTooltip.js';
import { getLocationDataForDay } from '../lib/getMapValue.js';

const geoUrl = '/states-map.json';

const MapChart = (props) => {
  const { when, axis, data, colorScale } = props;
  const [position, setPosition] = useState({coordinates: [0,0], zoom:1 });
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
  function handleMoveEnd(position) {
    setPosition(position);
  }

  return (
    <>
      <div ref={zoomableRef} style={{height:'100%',width:'100%'}} className={"map-panel"}>
        <MapTooltip
          left={toolTipData.left}
          top={toolTipData.top}
          show={toolTipData.show}
          data={toolTipData.data}
        />
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
                      onMouseEnter={(e) => handleMouseEnter(e, geo)}
                      onMouseLeave={(e) => handleMouseLeave(e, geo)}
                      onMouseMove={(e) => handleMouseMove(e, geo)}
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
    </>
  );
};

export default MapChart;


/*


      <Popper id={'id'} open={true} anchorEl={tooltip.anchorEl}>
        <div className={'some-class'}>The content of the Popper.</div>
      </Popper>

    //console.log(zoomableRef.current.getBoundingClientRect());
    const rect = zoomableRef.current.getBoundingClientRect();

    setTooltip({
      open:true,
      anchorEl: {
          clientWidth: rect.width,
          clientHeight: rect.height,
          getBoundingClientRect: () => { return rect },
        }
    });
*/
