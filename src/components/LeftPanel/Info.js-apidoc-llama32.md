**Info.js**
================

### Overview

This is a React component named `Info` that displays COVID-19 case and death information for a given location.

### Dependencies

* `React` from "react"
* `getDataValue`, `getFormattedDate`, and `getStateDataByName` functions from `../../lib/getMapValue`
* `moment-es6` library for date formatting
* `PropTypes` from "prop-types"
* `prop-types-exact` library for strict property type validation

### Info Component

```javascript
const Info = (props) => {
  /**
   * Extract data and location props from the component's parent
   */
  const { data, location } = props;

  /**
   * Get state data by name using `getStateDataByName` function
   */
  const stateData = getStateDataByName(data, location);

  /**
   * Calculate the difference between two values on a given axis
   * @param {string} axis - The axis to calculate the difference for (e.g. "confirmed", "deaths")
   * @returns {number} The difference between the current value and the previous value
   */
  const axisDifference = (axis) => {
    return (
      getDataValue(data, 'now', location, axis) -
      getDataValue(data, 'now', location, axis, -1));
  }

  /**
   * Format the current date in a human-readable format
   * @returns {string} The formatted date string
   */
  const lastDateInfo = () => {
    return getFormattedDate(data, 'now', 'M/D')
  }

  /**
   * Find the first case or death on a given axis and format it for display
   * @param {string} axis - The axis to find the first value for (e.g. "confirmed", "deaths")
   * @param {string} format - The date format to use when displaying the result
   * @returns {string} The formatted first case or death string
   */
  const findFirstDate = (axis, format) => {
    const date = data.dates[stateData.series[axis].filter(v => v === 0).length +1];

    return moment(date).format(format);
  }

  /**
   * Render the component's HTML structure
   */
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
}
```

### Prop Types

```javascript
Info.propTypes = exact({
  data: PropTypes.object.isRequired,
  location: PropTypes.string.isRequired,
});
```

This ensures that the `data` and `location` props are always provided to the component, and are expected to have the correct types.

### Usage

To use this component in your application, simply import it and pass in the required `data` and `location` props:

```javascript
import Info from './Info';

const data = {
  // Your data object here
};

const location = 'New York';

<Info data={data} location={location} />
```

This will render the component with the correct data and location information.