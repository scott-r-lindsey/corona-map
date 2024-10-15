**Tooltip.js**
================

### Overview

This JavaScript file defines a React component called `MapTooltip`. It displays a tooltip with various information about a location on a map.

### Importing Dependencies

The file starts by importing necessary dependencies:

```javascript
import React from "react";
import {capitalizeLocation} from '../../lib/getMapValue';
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```

*   `React` is the JavaScript library for building user interfaces.
*   `capitalizeLocation` is a custom function that capitalizes locations (more on this later).
*   `moment` is a library for working with dates and times.
*   `PropTypes` is a library for validating props (short for "properties") in React components.
*   `exact` is a utility function from `prop-types-exact` that creates a strict version of the `PropTypes` object.

### MapTooltip Component

The `MapTooltip` component is defined as a functional component:

```javascript
const MapTooltip = (props) => {
```

It takes in several props:

```javascript
  const {left, top, show, data} = props;
```

*   `left` and `top` are numbers that represent the position of the tooltip on the map.
*   `show` is a boolean that determines whether the tooltip should be displayed or not.
*   `data` is an object that contains information about the location (more on this later).

### Style Calculation

The component calculates a style object for the tooltip based on its position and visibility:

```javascript
  const style = {
    position: 'absolute',
    left: left,
    top: top -15,
    display: show ? 'block' : 'none',
  };
```

This code sets the `position` to `absolute`, which allows the tooltip to be positioned relative to its nearest positioned ancestor. The `left` and `top` properties are set to the values passed in as props, with a slight offset (-15 pixels) for the top property. Finally, the `display` property is toggled between `block` and `none` based on the value of the `show` prop.

### Rounding Function

The component defines a function called `roundFour` that takes a number as input and returns its rounded equivalent:

```javascript
  const roundFour = (val) => Math.trunc(val * 1000)/1000;
```

This function is used to display percentages with one decimal place. For example, if the input value is 1234.56, the output will be 1235.

### JSX Render

The component returns JSX that represents the tooltip:

```javascript
return (
  <>
    {data.location ?
      // Tooltip content
      <div style={style} className={"map-tooltip"}>
        {/* ... */}
      </div>
      :
      // Empty div for hiding the tooltip when data is not available
      <div></div>
    }
  </>
);
```

When `data.location` is truthy, the component renders a `div` element with the calculated style and class name. Inside this element, there are several child elements that contain various information about the location:

*   Location name (capitalized using `capitalizeLocation`)
*   Total cases and deaths
*   Cases and deaths per 1000 people
*   Population of the location
*   Date of last update (if available)

When `data.location` is falsy, an empty `div` element is rendered to hide the tooltip.

### Prop Validation

The component defines prop validation using `PropTypes`:

```javascript
MapTooltip.propTypes = exact({
  data: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
});
```

This code checks that the following props are provided when the component is rendered:

*   `data`: an object (required)
*   `left` and `top`: numbers (required)
*   `show`: a boolean (required)

If any of these props are missing, an error will be thrown.

### Exports

Finally, the component is exported as default export:

```javascript
export default MapTooltip;
```

This allows other components to import and use the `MapTooltip` component.