# /var/www/html/scott/corona-map/src/index.jsx

This file is the main entry point for rendering a dynamic map-based application that displays COVID-19 data. It uses React and several other libraries to create a responsive interface that adapts to different screen sizes and displays relevant data and advertisements.

## Imports

```jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { scaleLog } from 'd3-scale';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Map from './Map';
import LeftPanel from './LeftPanel';
import MapSlider from './Map/Slider';
import AmznSearchAd from './Ad/AmznSearchAd';
import BottomAdMd from './BottomAdMd';
import MapWidgets from './Map/Widgets';
import { minColor, maxColor } from '../lib/colors';
import { getMaxValueForAxis, getTrimmedData } from '../lib/getMapValue';
import MobileMain from './Main/Mobile/index';
```

- **React**: Core library for building user interfaces.
- **useParams**: A hook from `react-router-dom` for accessing URL parameters.
- **scaleLog**: A D3 scale function for logarithmic scaling.
- **withWidth**: A higher-order component from Material-UI to provide the current screen width as a prop.
- **PropTypes & exact**: For type-checking React props.
- **Map, LeftPanel, MapSlider, AmznSearchAd, BottomAdMd, MapWidgets, MobileMain**: Custom React components imported from various files.
- **minColor, maxColor**: Color constants used for the map's color scale.
- **getMaxValueForAxis, getTrimmedData**: Utility functions for data processing.

## Main Component

### Declaration

```jsx
const Main = (props) => {
```

The `Main` component is a functional React component that receives `props` as its argument. It is responsible for rendering the main content of the application based on the screen width and URL parameters.

### Parameters

```jsx
const params = useParams();
const { when, axis, quant } = params;
const { data, width } = props;
```

- **params**: Extracted URL parameters using the `useParams` hook.
  - `when`: A time-related parameter.
  - `axis`: Axis parameter used for data representation.
  - `quant`: Quantity type (e.g., 'total', 'percap').
- **data**: Data prop passed to the component.
- **width**: Screen width prop provided by the `withWidth` HOC.

### Data Processing

```jsx
let min;
const max = getMaxValueForAxis(data, `${axis}-${quant}`);

if (quant === 'total') {
  min = 1;
} else if (quant === 'percap') {
  min = 0.00001;
}

const colorScale = scaleLog()
  .domain([min, max])
  .range([minColor, maxColor]);

const trimmedData = getTrimmedData(data, when);
const mobile = /xs/.test(width);
const small = /sm/.test(width);
```

- **min**: Minimum value for the color scale, determined by `quant`.
- **max**: Maximum value for the color scale, calculated using `getMaxValueForAxis`.
- **colorScale**: Logarithmic color scale for the map, created using `d3-scale`.
- **trimmedData**: Data filtered by the specified time using `getTrimmedData`.
- **mobile**: Boolean indicating if the screen width is extra small.
- **small**: Boolean indicating if the screen width is small.

### Layout and Rendering

```jsx
let mainWidth = 728;
const adHeight = 136;

if (width === 'sm') {
  mainWidth = 512;
}
```

- **mainWidth**: Width of the main panel, adjusted based on screen size.
- **adHeight**: Height of the advertisement area.

The component then conditionally renders different layouts based on screen size:

#### Mobile Layout

```jsx
return (
  <>
    { mobile
      ? (
        <MobileMain
          data={data}
          axis={axis}
          when={when}
          colorScale={colorScale}
        />
      )
```

- **MobileMain**: A separate component for the mobile layout, receiving relevant props.

#### Desktop Layout

The desktop layout further differentiates between small and larger screens:

##### Small Screen Layout

```jsx
: (
  <>
    { small
      ? (
        <>
          <div
            className="d-left-column"
            style={{
              width: `calc(100% - ${mainWidth}px)`,
              bottom: '17px',
            }}
          >
            <LeftPanel
              data={trimmedData}
              adHeight={adHeight}
            />
          </div>
          <div
            className="d-main-panel"
            style={{ width: `${mainWidth}px` }}
          >
            <MapWidgets
              max={max}
              colorScale={colorScale}
              data={trimmedData}
            />
            <Map
              when={when}
              axis={`${axis}-${quant}`}
              data={data}
              colorScale={colorScale}
            />
            <MapSlider data={data} />
          </div>
          <BottomAdMd adHeight={adHeight}>
            <AmznSearchAd
              adHeight={adHeight}
              amznAdVals={data.searchVals}
            />
          </BottomAdMd>
        </>
      )
```

- A combination of `LeftPanel`, `Map`, `MapWidgets`, and `MapSlider` components.
- Advertisements are displayed using `AmznSearchAd` and `BottomAdMd`.

##### Large Screen Layout

```jsx
: (
  <>
    <div
      className="d-left-column"
      style={{ width: `calc(100% - ${mainWidth}px)` }}
    >
      <LeftPanel
        data={trimmedData}
        adHeight={0}
      />
    </div>
    <div
      className="d-main-panel"
      style={{ width: `${mainWidth}px`, bottom: `${adHeight}px` }}
    >
      <MapWidgets
        max={max}
        colorScale={colorScale}
        data={trimmedData}
      />
      <Map
        when={when}
        axis={`${axis}-${quant}`}
        data={data}
        colorScale={colorScale}
      />
      <MapSlider data={data} />
    </div>
    <div
      className="d-main-footer"
      style={{ width: `${mainWidth}px`, height: adHeight }}
    >
      <AmznSearchAd
        adHeight={adHeight}
        amznAdVals={data.searchVals}
      />
    </div>
  </>
)
```

- Similar components as the small screen layout but with adjusted styles and no bottom advertisement in the footer.

### PropTypes

```jsx
Main.propTypes = exact({
  data: PropTypes.object.isRequired,
  width: PropTypes.string.isRequired,
});
```

- **data**: Required object containing the map data.
- **width**: Required string representing the screen width.

### Export

```jsx
export default withWidth()(Main);
```

- The `Main` component is wrapped with the `withWidth` HOC to provide the `width` prop.
- The wrapped component is exported as the default export.

## Summary

This file defines the `Main` component which dynamically renders a map-based COVID-19 data visualization. It adapts to different screen sizes, displaying different layouts and components for mobile, small, and large screens. It also integrates advertisements and uses a logarithmic color scale for data representation.