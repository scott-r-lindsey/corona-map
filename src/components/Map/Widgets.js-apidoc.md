# File Documentation: Widgets.js

## File Path
`/var/www/html/scott/corona-map/src/Widgets.js`

## Overview
This file contains the definition of the `Widgets` React functional component. It imports several other components and utilities, such as `Scale`, `QuantPicker`, `AxisPicker`, `MapPicker`, `Search`, and a color utility (`zeroColor`). The `Widgets` component is used to render a set of controls and visual elements related to a map-based interface, likely for a Corona (COVID-19) data visualization application.

## Imports
```javascript
import React from 'react';
import Scale from './Scale';
import QuantPicker from './QuantPicker';
import AxisPicker from './AxisPicker';
import MapPicker from './MapPicker';
import { zeroColor } from '../../lib/colors';
import Search from './Search';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```
- **React**: Core library for building user interfaces.
- **Scale**: Component that likely visualizes data scales, imported from a local file `./Scale`.
- **QuantPicker**: Component for selecting quantitative data options, imported from `./QuantPicker`.
- **AxisPicker**: Component for selecting axis configurations, imported from `./AxisPicker`.
- **MapPicker**: Component for selecting map configurations, imported from `./MapPicker`.
- **zeroColor**: A color utility possibly representing a default or 'zero' state color, imported from `../../lib/colors`.
- **Search**: Component for searching data, imported from `./Search`.
- **PropTypes**: Library for type-checking React props.
- **exact**: Utility from `prop-types-exact` for ensuring no additional properties are passed in props.

## Widgets Component
### Definition
```javascript
const Widgets = (props) => {
  const {data, max, colorScale} = props;
  
  return (
    <>
      <Search data={data} />
      <div className={"map-widget-shell"}>
        <div style={{float:'left', display:'inline-block'}}>
          <Scale {...{max, zeroColor, colorScale}} />
          <div style={{display:'inline-block'}}>
            <QuantPicker />
            <AxisPicker />
            <MapPicker />
          </div>
        </div>
      </div>
    </>
  );
}
```

### Explanation
- The `Widgets` component is a functional component that takes `props` as an argument.
- It destructures `data`, `max`, and `colorScale` from the `props` object.
- The component returns a fragment (`<>...</>`) containing:
  1. **Search Component**: Rendered with `data` prop passed in, likely used to search within the provided data.
  2. **Container Div**: Contains the map widget elements with the class `map-widget-shell`.
     - **Inner Div**: Floats to the left and displays inline-block elements.
       - **Scale Component**: Rendered with `max`, `zeroColor`, and `colorScale` props passed in using the spread operator.
       - **Controls Div**: Contains `QuantPicker`, `AxisPicker`, and `MapPicker` components, all displayed inline-block.

### Prop Types
```javascript
Widgets.propTypes = exact({
  max: PropTypes.number.isRequired,
  colorScale: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
});
```
- The prop types for `Widgets` are defined using `exact` to ensure no additional props are passed.
- **max**: A required number, likely representing the maximum value for the scale.
- **colorScale**: A required function, probably used to determine colors based on data values.
- **data**: A required object, representing the data to be visualized and searched.

## Default Export
```javascript
export default Widgets;
```
- The `Widgets` component is exported as the default export of the module, making it available for import in other parts of the application.

## Summary
The `Widgets` component assembles a set of map-related controls and visualization tools, integrating various sub-components to allow users to interact with and visualize COVID-19 data. The component ensures the necessary props are provided and uses inline styling for layout adjustments.