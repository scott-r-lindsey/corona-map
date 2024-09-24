# File Documentation: ChartLegend.js

## Overview
This file defines a React functional component named `ChartLegend` which is used to display a legend for a chart. The legend includes labels for minimum and maximum values along with a color-coded key for different data categories (Confirmed, Deaths, Exponent).

## Imports

```javascript
import React from "react";
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
import {confirmedColor, deathColor, logColor} from '../../lib/colors.js';
```

- **React**: The core library for building user interfaces in a declarative manner.
- **PropTypes**: A library for type-checking of the props passed to the component, ensuring they meet the specified requirements.
- **exact**: A utility from `prop-types-exact` to ensure that only the specified props are passed to the component, and no extra props are allowed.
- **confirmedColor, deathColor, logColor**: These are color codes imported from `../../lib/colors.js` and are used to style the legend dots corresponding to different data categories.

## Component Definition

```javascript
const ChartLegend = (props) => {
  const {min, max} = props;

  return (
    <div className={"chart-legend"}>
      <div className={"tick-label min"}>
        {min}
      </div>
      <div className={"tick-label max"}>
        {max}
      </div>
      <div className={"middle"}>
        <div className={"dot"} style={{backgroundColor:confirmedColor}} />
        Confirmed
        <div className={"dot"} style={{backgroundColor:deathColor}} />
        Deaths
        <div className={"dot"} style={{backgroundColor:logColor}} />
        Exponent
      </div>
    </div>
  );
}
```
### Props
- **min (string)**: The minimum value to be displayed on the legend.
- **max (string)**: The maximum value to be displayed on the legend.

### Structure
- **Outer `div`**: This container uses the class name `"chart-legend"` to apply relevant styles.
- **Min Label**: A `div` with the class name `"tick-label min"` to display the minimum value.
- **Max Label**: A `div` with the class name `"tick-label max"` to display the maximum value.
- **Middle Section**: Another `div` with the class name `"middle"` that contains:
  - **Confirmed Dot**: A `div` with the class name `"dot"` and styled with `confirmedColor`, accompanied by the text "Confirmed".
  - **Deaths Dot**: A `div` with the class name `"dot"` and styled with `deathColor`, accompanied by the text "Deaths".
  - **Exponent Dot**: A `div` with the class name `"dot"` and styled with `logColor`, accompanied by the text "Exponent".

## PropTypes Validation

```javascript
ChartLegend.propTypes = exact({
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
});
```

- **PropTypes**: This ensures that the component receives `min` and `max` props and that both are strings and required.
- **exact**: The `exact` utility from `prop-types-exact` ensures that no additional props beyond `min` and `max` are passed to the component.

## Default Export

```javascript
export default ChartLegend;
```

- The component is exported as the default export, allowing it to be imported and used in other parts of the application.

---

### Summary
The `ChartLegend` component is a simple, reusable component that displays a legend for a chart. It ensures the correct type and presence of props through PropTypes and uses imported color values to style the legend dots. This component is a part of a larger application, likely related to displaying data on COVID-19 (based on the import paths and color names).