# Detailed Documentation for `/var/www/html/scott/corona-map/src/Info.js`

This file contains a React functional component named `Info`, which is used to display COVID-19 related data, such as the number of confirmed cases and deaths for a specific location. Below is a breakdown of the file's contents, including the purpose and functionality of each part of the code.

## Imports

```javascript
import React from "react";
import { getDataValue, getFormattedDate, getStateDataByName } from '../../lib/getMapValue';
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```

- **React**: The core React library for building user interfaces.
- **getDataValue, getFormattedDate, getStateDataByName**: Functions imported from a local library (`../../lib/getMapValue`) used for data retrieval and formatting.
- **moment**: A date manipulation library used to format dates.
- **PropTypes**: A library used for type-checking React component props to ensure they are passed correctly.
- **exact**: A utility from `prop-types-exact` to enforce that only the specified prop types are passed to the component.

## Component Definition

```javascript
const Info = (props) => {
  const { data, location } = props;
  const stateData = getStateDataByName(data, location);
```

- **Info**: A functional component that receives `props` containing `data` (an object representing COVID-19 data) and `location` (a string for the location name).
- **stateData**: Obtained by calling `getStateDataByName`, which filters or extracts data specific to the provided `location` from the overall dataset.

## Helper Functions

### axisDifference

```javascript
const axisDifference = (axis) => {
  return (
    getDataValue(data, 'now', location, axis) -
    getDataValue(data, 'now', location, axis, -1)
  );
}
```

- **Purpose**: Calculates the difference in a specified data axis (e.g., confirmed cases or deaths) between the most recent data point and the previous one.
- **Parameters**: 
  - `axis`: A string specifying the data category ('confirmed' or 'deaths').
- **Returns**: The difference in values for the specified axis as a numerical value.

### lastDateInfo

```javascript
const lastDateInfo = () => {
  return getFormattedDate(data, 'now', 'M/D');
}
```

- **Purpose**: Retrieves the most recent date from the data and formats it into 'Month/Day' format.
- **Returns**: A formatted date string representing the last recorded date.

### findFirstDate

```javascript
const findFirstDate = (axis, format) => {
  const date = data.dates[stateData.series[axis].filter(v => v === 0).length + 1];
  return moment(date).format(format);
}
```

- **Purpose**: Finds the first date when the specified data axis reached a non-zero value.
- **Parameters**:
  - `axis`: A string specifying the data category ('confirmed' or 'deaths').
  - `format`: A string specifying the desired date format.
- **Returns**: A formatted date string for the first occurrence of a non-zero value in the specified axis.

## JSX Rendering

```javascript
return (
  <table>
    <thead>
      <tr>
        <th>Cases</th>
        <th>Deaths</th>
      </tr>
    </thead>
    <tbody>
      <tr className={"data"}>
        <td className={"confirmed"}>
          { getDataValue(data, 'now', location, 'confirmed').toLocaleString() }
          <span className={"increase"}>
            (+{ axisDifference('confirmed').toLocaleString()} <br />
            on {lastDateInfo()} )
          </span>
        </td>
        <td className={"deaths"}>
          { getDataValue(data, 'now', location, 'deaths').toLocaleString() }
          <span className={"increase"}>
            (+{ axisDifference('deaths').toLocaleString()} <br />
            on {lastDateInfo()} )
          </span>
        </td>
      </tr>
      <tr className={"more-info"}>
        <td className={"confirmed"}>
          <span>First Case:</span> {findFirstDate('confirmed', 'MMMM Do')}
        </td>
        <td className={"deaths"}>
          <span>First Death:</span> {findFirstDate('deaths', 'MMMM Do')}
        </td>
      </tr>
    </tbody>
  </table>
);
```

- **Structure**: A table with two columns: 'Cases' and 'Deaths'.
- **Rows**:
  - The first row displays the current number of confirmed cases and deaths, the increase since the last date, and the last date with available data.
  - The second row provides information about the date of the first recorded case and death for the specified location.

## PropTypes

```javascript
Info.propTypes = exact({
  data: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
});
```

- **Purpose**: Defines the expected prop types for the `Info` component.
- **`data`**: Must be an object and is required.
- **`location`**: Must be a string and is required.
- **`exact`**: Ensures that only the specified props are passed to the `Info` component, preventing additional, unexpected props.

## Export

```javascript
export default Info;
```

- **Exports**: The `Info` component is exported as the default export, making it available for import in other parts of the application.

This documentation provides a comprehensive overview of the functionality and implementation details of the `Info` component, including its dependencies, logic, and usage.