# Documentation for Tooltip.js

## Overview
`Tooltip.js` is a React component that generates a tooltip for displaying COVID-19 related data on a map. This tooltip displays information such as the total number of cases, total deaths, cases per thousand, deaths per thousand, and the population of a given location. The tooltip's position and visibility are controlled through props passed to the component.

## Imports
```javascript
import React from "react";
import {capitalizeLocation} from '../../lib/getMapValue';
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```
- **React**: The core library for building user interfaces.
- **capitalizeLocation**: A utility function to capitalize the location name. This is imported from a local file.
- **moment**: A library for parsing, validating, manipulating, and formatting dates.
- **PropTypes**: A library for type-checking props passed to React components.
- **exact**: A helper from `prop-types-exact` to ensure that no additional props are passed to the component.

## Component Definition
```javascript
const MapTooltip = (props) => {
  const { left, top, show, data } = props;

  const style = {
    position: 'absolute',
    left: left,
    top: top - 15,
    display: show ? 'block' : 'none',
  };

  const roundFour = (val) => Math.trunc(val * 1000) / 1000;
```
- **MapTooltip**: A functional React component that takes `props` as an argument.
- **left, top, show, data**: Destructured properties from the `props` object.
- **style**: An inline style object to position the tooltip on the map. The tooltip is positioned absolutely at the coordinates `(left, top - 15)`. The tooltip is displayed only when `show` is true.
- **roundFour**: A helper function to round a number to three decimal places by truncating the excess.

## JSX Structure
```javascript
  return (
    <>
      { data.location ?
        <div style={style} className={"map-tooltip"}>
          <div className={"map-tooltip-anchor"}>
            <div className={"map-tooltip-inner"}>
              <strong>{ capitalizeLocation(data.location) }</strong>
              <table>
                <tbody>
                  <tr>
                    <td>
                      Total Cases:
                    </td>
                    <td className={"confirmed"}>
                      {data.axis ? data.axis.confirmed.toLocaleString() : '' }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Total Deaths:
                    </td>
                    <td className={"deaths"}>
                      {data.axis ? data.axis.deaths.toLocaleString() : '' }<br />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                        <hr />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Cases/1000:
                    </td>
                    <td className={"confirmed"}>
                      {data.axis ? roundFour(data.axis.confirmedPercap) : '' }
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Deaths/1000:
                    </td>
                    <td className={"deaths"}>
                      {data.axis ? roundFour(data.axis.deathsPercap) : '' }<br />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <span className={"pop"}>Pop. { data.pop.toLocaleString() }</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className={"when"}>
                <span>as of</span> { data.location ?
                  moment(data.date).format('MMMM Do') : null
                }
              </div>
            </div>
          </div>
        </div> :
        <div></div>
      }
    </>
  );
}
```
- **Conditional Rendering**: The tooltip is rendered only if `data.location` is available.
- **Tooltip Structure**: The tooltip consists of:
  - A div with the class `map-tooltip` and an inline style for positioning.
  - A nested structure with classes `map-tooltip-anchor` and `map-tooltip-inner` for additional styling.
  - A table displaying the COVID-19 data:
    - Total cases and deaths, both formatted with commas for readability.
    - Cases and deaths per thousand, rounded to three decimal places.
    - Population, formatted with commas for readability.
  - A date formatted using `moment` to show data as of a specific date.

## Prop Types
```javascript
MapTooltip.propTypes = exact({
  data: PropTypes.object.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired,
});
```
- **PropTypes**: Specifies the types and requirements for the props passed to `MapTooltip`.
  - `data`: An object containing the data to be displayed (required).
  - `left`: A number representing the left position for the tooltip (required).
  - `top`: A number representing the top position for the tooltip (required).
  - `show`: A boolean indicating whether the tooltip should be shown (required).

## Export
```javascript
export default MapTooltip;
```
- **Export**: Exports the `MapTooltip` component as the default export for use in other parts of the application.

This comprehensive documentation covers the functionality, structure, and usage of the `MapTooltip` component, making it easier for developers to understand and maintain the code.