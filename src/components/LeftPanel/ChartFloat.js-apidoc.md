Sure! Below is a detailed documentation for the `ChartFloat.js` file located at `/var/www/html/scott/corona-map/src/`.

---

# ChartFloat.js

This file defines a React functional component, `ChartFloat`, which is responsible for displaying formatted data pertaining to confirmed cases and deaths based on the provided data and point props. The data is formatted using the `moment` library for dates and `toLocaleString()` for numeric values.

## Imports

```javascript
import React from "react";
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```

1. **React**: The core library for building user interfaces.
2. **moment**: A library for parsing, validating, manipulating, and formatting dates.
3. **PropTypes**: Library for type-checking props in React components.
4. **exact**: A utility from `prop-types-exact` to ensure that only the specified props are passed to the component.

## Component Definition

### ChartFloat Functional Component

```javascript
const ChartFloat = (props) => {
  const {point, data} = props;

  return (
    <>
      { point ?
        <div className="chart-float">

          <strong>{ moment(point.data.time).format("MMMM Do") }</strong>

          <table>
            <tbody>
              <tr>
                <td>
                  Confirmed:
                </td>
                <td className={"confirmed"}>
                  { data.series.confirmed[point.data.pos].toLocaleString() }
                </td>
              </tr>
              <tr>
                <td>
                  Deaths:
                </td>
                <td className={"deaths"}>
                  { data.series.deaths[point.data.pos].toLocaleString() }
                </td>
              </tr>
            </tbody>
          </table>
        </div> :
        null
      }
    </>
  );
}
```

#### Props Destructuring

```javascript
const {point, data} = props;
```

The component receives `props` which are destructured into `point` and `data` variables.

#### Conditional Rendering

```javascript
{ point ? ... : null }
```

- The component conditionally renders its content based on the presence of the `point` prop. If `point` is `null` or `undefined`, nothing is rendered.

#### Date Formatting

```javascript
<strong>{ moment(point.data.time).format("MMMM Do") }</strong>
```

- Uses `moment` to format the date contained in `point.data.time` to a readable format like "January 1st".

#### Data Display

```javascript
<table>
  <tbody>
    <tr>
      <td>Confirmed:</td>
      <td className={"confirmed"}>
        { data.series.confirmed[point.data.pos].toLocaleString() }
      </td>
    </tr>
    <tr>
      <td>Deaths:</td>
      <td className={"deaths"}>
        { data.series.deaths[point.data.pos].toLocaleString() }
      </td>
    </tr>
  </tbody>
</table>
```

- Displays the number of confirmed cases and deaths using data from the `data` prop. The values are formatted to include commas as thousands separators using `toLocaleString()`.

## PropTypes

```javascript
ChartFloat.propTypes = exact({
  data: PropTypes.object.isRequired,
  point: PropTypes.object,
});
```

- **data**: An object that is required. It contains the series of data points for confirmed cases and deaths.
- **point**: An optional object that contains the specific data point information, such as the time and position in the series.

The `exact` utility ensures that no additional props other than `data` and `point` are passed to the `ChartFloat` component.

## Export

```javascript
export default ChartFloat;
```

- Exports the `ChartFloat` component as the default export of the module.

---

This documentation provides a comprehensive overview of the `ChartFloat.js` file, explaining the purpose and functionality of the component, the significance of each import, and the structure and logic within the component itself.