# Detailed Documentation for `index.js`

## Overview

This file is the main component for rendering a COVID-19 map visualization using React and the `react-simple-maps` library. It dynamically adjusts the map's size and updates the URL based on user interactions. The map shows either state or county-level data, depending on the current mode, and displays tooltips with additional information.

## Imports

The file imports necessary libraries and utilities at the beginning:

- **React, useState, useLayoutEffect**: Core React functionalities for state management and lifecycle hooks.
- **ComposableMap, Geographies, Geography**: Components from `react-simple-maps` to render the map.
- **updateUrl**: A utility function to update the URL based on user interactions.
- **useParams, useHistory**: React Router hooks for accessing URL parameters and history.
- **zeroColor**: A color constant for zero values.
- **MapTooltip**: A custom tooltip component to display additional information.
- **getLocationDataForDayById, parseWhen**: Utility functions for parsing data.
- **PropTypes, exact**: PropTypes for type-checking React props.

## Constants

- **stateMapUrl**: URL for the states map JSON.
- **countyMapUrl**: URL for the counties map JSON.

## Component: `MapChart`

### Props
- **when**: Date string indicating the time frame for the data.
- **axis**: String indicating the data axis to be used.
- **data**: Object containing the data to be visualized.
- **colorScale**: Function to determine the color of each geography based on data values.

### State
- **mapDims**: State to hold the dimensions of the map.
- **toolTipData**: State to hold tooltip information.

### Initialization
- **history**: Hook to access the browser's history.
- **params**: Hook to access URL parameters.
- **mode, location**: Destructured from `params`, indicating the current mode and location.

### Variables
- **max**: Maximum value parsed from data.
- **offset**: Offset calculated from `max` and the length of `data.dates`.
- **days**: Number of days in the data.
- **zoomableRef**: Reference to the map container element.
- **timeoutId**: Variable to store timeout ID for debouncing resize events.

### Functions

#### `setMapSize`
Adjusts the map size based on the container's dimensions.
```javascript
const setMapSize = () => {
  if (zoomableRef.current) {
    setMapDims({
      x: zoomableRef.current.clientWidth,
      y: zoomableRef.current.clientHeight + 40,
      scale: 1000 * (zoomableRef.current.clientWidth / 800)
    });
  }
}
```

#### `resizeListener`
Debounced resize listener to handle window resize events.
```javascript
const resizeListener = () => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => setMapSize(), 150);
};
```

#### `handleMouseEnter`
Handles mouse enter events to show the tooltip.
```javascript
function handleMouseEnter(e, geography){
  const el = zoomableRef.current;
  const rect = el.getBoundingClientRect();
  const toolTipData = getLocationDataForDayById(data, when, geography.id);
  setToolTipData({
    left: e.clientX - rect.left,
    top: e.clientY - rect.top,
    data: toolTipData,
    show: true
  });
}
```

#### `handleMouseMove`
Handles mouse move events to update the tooltip position.
```javascript
function handleMouseMove(e, geography){
  const el = zoomableRef.current;
  const rect = el.getBoundingClientRect();
  const toolTipData = getLocationDataForDayById(data, when, geography.id);
  setToolTipData({
    left: e.clientX - rect.left,
    top: e.clientY - rect.top,
    data: toolTipData,
    show: true
  });
}
```

#### `handleMouseLeave`
Handles mouse leave events to hide the tooltip.
```javascript
function handleMouseLeave(e, geography){
  setToolTipData({ left: 0, top: 0, data: {}, show: false });
}
```

#### `handleStateClick`
Handles state click events to update the URL and navigate.
```javascript
function handleStateClick(e, geography){
  history.push(
    updateUrl(
      params,
      { location: data.location[geography.id].name.toLowerCase() }
    )
  );
}
```

### Effect
Sets the initial map size on component mount.
```javascript
useLayoutEffect(() => {
  setMapSize();
}, []);
```

### Window Event Listener
Adds a resize event listener to the window.
```javascript
window.addEventListener('resize', resizeListener);
```

### Render
Returns the JSX for rendering the map and tooltip.
```jsx
return (
  <>
    <div ref={zoomableRef} style={{ height: '100%', width: '100%' }} className={"map-panel"}>
      { touch ? null : <MapTooltip left={toolTipData.left} top={toolTipData.top} show={toolTipData.show} data={toolTipData.data} /> }
      <ComposableMap projectionConfig={{ scale: mapDims.scale }} width={mapDims.x} height={mapDims.y} projection="geoAlbersUsa" style={{ width: mapDims.x, height: mapDims.y }}>
        <Geographies geography={mode === 'COVID-COUNTY' ? countyMapUrl : stateMapUrl }>
          {({ geographies }) =>
            geographies.map(geo => {
              let cur;
              if (data.location[geo.id]){
                cur = data.location[geo.id];
              }
              else if (data.location[geo.id.padEnd(5,'0')]){
                cur = data.location[geo.id.padEnd(5,'0')];
              }
              else{
                return null;
              }
              return (
                <Geography
                  onClick={(e) => handleStateClick(e, geo)}
                  onMouseEnter={(e) => handleMouseEnter(e, geo)}
                  onMouseLeave={(e) => handleMouseLeave(e, geo)}
                  onMouseMove={(e) => handleMouseMove(e, geo)}
                  className={cur.name.toLowerCase() === location ? 'focused-state' : ''}
                  key={geo.rsmKey}
                  geography={geo}
                  fill={ (cur.series[axis][days + offset] === 0) ? zeroColor : colorScale(cur.series[axis][days + offset]) }
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  </>
);
```

## PropTypes

Defines the expected types of the props using `PropTypes` and `exact`.
```javascript
MapChart.propTypes = exact({
  when: PropTypes.string.isRequired,
  axis: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  colorScale: PropTypes.func.isRequired,
});
```

## Export

Exports the `MapChart` component for use in other parts of the application.
```javascript
export default MapChart;
```