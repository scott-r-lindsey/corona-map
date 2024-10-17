# File Documentation: Scale.js

This file defines a React component called `Scale` which is used to create a visual scale for a map. The component adjusts based on the screen size (mobile or desktop) and displays values formatted according to specific criteria.

## Import Statements

```javascript
import React from 'react';
import { logmidpoints } from '../../lib/util';
import withWidth from '@material-ui/core/withWidth';
import { abbreviateNumber } from '../../lib/getMapValue';
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```

- **React:** Core library for building user interfaces.
- **logmidpoints:** A utility function for logarithmic scaling, imported from a custom utility library.
- **withWidth:** A higher-order component from Material-UI to get the current screen width.
- **abbreviateNumber:** A function to abbreviate large numbers, imported from a custom utility library.
- **useParams:** A hook from `react-router-dom` to access route parameters.
- **PropTypes:** Library for type-checking of props.
- **exact:** A utility to ensure prop types are exact.

## Component: Scale

### Functional Component Definition

```javascript
const Scale = (props) => {
```

This is a functional component that receives props and returns JSX to render a scale.

### Props Destructuring

```javascript
  const {max, zeroColor, colorScale, width} = props;
```

- **max:** Maximum value for the scale.
- **zeroColor:** Color to use for the zero value.
- **colorScale:** Function to determine the color based on a value.
- **width:** Width of the screen (used to determine if the device is mobile).

### Mobile Detection and Points Calculation

```javascript
  const mobile = /xs/.test(width);
  const points = mobile ? 3 : 4;
```

- **mobile:** Boolean indicating if the screen width is extra-small (xs).
- **points:** Number of points to display on the scale (3 for mobile, 4 for desktop).

### Route Parameters

```javascript
  const {quant} = useParams();
```

- **quant:** Route parameter used to determine the quantization type ('total' or 'percap').

### Rounding Functions

```javascript
  const round = (i) => quant === 'total' ? Math.round(i) : i;
  const roundFour = (val) => Math.round(val * 100)/100;
  const roundEight = (val) => Math.round(val * 100000)/100;
```

- **round:** Rounds the value if `quant` is 'total'.
- **roundFour:** Rounds the value to two decimal places.
- **roundEight:** Rounds the value to five decimal places.

### Minimum Value Determination

```javascript
  let min;
  if ('total' === quant){
    min = 1;
  }
  else if ('percap' === quant){
    min = .00001;
  }
  else{
  }
```

- **min:** Minimum value for the scale, set based on the `quant` parameter.

### Format Scale Number

```javascript
  const formatScaleNumber = (val) => {
    if ('percap' === quant){
      if (val < 0.01){
        return roundEight(val) + '/M';
      }
      else{
        return roundFour(val) + '/K';
      }
    }
    else if ('total' === quant) {
      if (mobile){
        return abbreviateNumber(val);
      }
    }
    return val;
  }
```

- **formatScaleNumber:** Formats the scale number based on the quantization type and value.

### Logarithmic Values Calculation

```javascript
  const values = logmidpoints(min, max, points)
    .map((val) => { return round(val) });
```

- **values:** Array of logarithmically spaced values between `min` and `max`, rounded based on the `quant` parameter.

### Add Zero to Values

```javascript
  values.unshift(0);
```

- **values:** Ensure zero is included at the beginning of the array.

### JSX Return Statement

```javascript
  return(
    <div className={"map-scale"}>
      {
        values.map((v) => {
            return (
              (v) === 0 ?
              <div key={v} style={{backgroundColor: zeroColor}}>0</div> :
              <div key={v} style={{backgroundColor: colorScale(v)}}>
                { formatScaleNumber(v).toLocaleString() }
              </div>
            )
          }
        )
      }
    </div>
  );
}
```

- **JSX:** Returns a div containing the scale. Each value is mapped to a div with a background color based on the value and formatted text.

### Export Component

```javascript
export default withWidth()(Scale);
```

- **withWidth:** Wraps the component to inject the `width` prop.

### PropTypes

```javascript
Scale.propTypes = exact({
  max: PropTypes.number.isRequired,
  zeroColor: PropTypes.string.isRequired,
  colorScale: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
});
```

- **propTypes:** Defines the expected props and their types using `PropTypes` and `exact` to ensure no additional props are passed.

This completes the detailed documentation of the `Scale.js` file. The component is responsible for rendering a visual scale, adapting to screen sizes, and formatting values based on specific criteria.