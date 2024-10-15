**ChartLegend.js Documentation**
=====================================

### Overview

This JavaScript file defines a React component named `ChartLegend`. It is responsible for rendering a legend for a chart, displaying the minimum and maximum values on the y-axis, along with three color-coded dots representing confirmed cases, deaths, and logarithmic growth.

### Import Statements
----------------------

The following import statements are used to fetch necessary dependencies:

```javascript
import React from "react";
import PropTypes from "prop-types";
import exact from 'prop-types-exact';

import {confirmedColor, deathColor, logColor} from '../../lib/colors.js'
```

*   `React` is the primary library for building user interfaces in JavaScript.
*   `PropTypes` is a library used to validate the types of props passed to React components.
*   `exact` is a higher-order function that ensures prop types are exact and do not allow any extra props.
*   The imported colors (`confirmedColor`, `deathColor`, `logColor`) come from a separate file (`colors.js`) in the `/lib` directory.

### ChartLegend Component
-------------------------

#### Functionality

The `ChartLegend` component takes two required string props: `min` and `max`. These props represent the minimum and maximum values on the y-axis of the chart. The component returns a JSX element that displays these values, along with three color-coded dots representing confirmed cases, deaths, and logarithmic growth.

#### Code

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

*   The component uses destructuring assignment to extract the `min` and `max` props from the `props` object.
*   It returns a JSX element that represents the legend. This element contains two sub-elements: one for displaying the minimum value (`{min}`) and another for displaying the maximum value (`{max}`);
*   Below these values, there is a middle section containing three color-coded dots:
    *   The first dot displays the `confirmedColor`, which is used to represent confirmed cases.
    *   The second dot displays the `deathColor`, representing deaths.
    *   The third dot displays the `logColor`, which represents logarithmic growth.

### Prop Types
----------------

The component uses `PropTypes` to validate the types of props passed to it. In this case, both required props (`min` and `max`) must be strings:

```javascript
export default ChartLegend;

ChartLegend.propTypes = exact({
  min: PropTypes.string.isRequired,
  max: PropTypes.string.isRequired,
});
```

### Export Statement
---------------------

The component is exported as the default export of the file using the `export default` statement.

```javascript
export default ChartLegend;
```

This allows other files to import and use the `ChartLegend` component.