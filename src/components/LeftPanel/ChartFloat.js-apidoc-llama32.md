**ChartFloat.js**
================

### Overview

The `ChartFloat` component is a React functional component that displays chart float data on a map. It takes two props: `data` and `point`, which contain the necessary data to render the chart float.

### Import Statements

```javascript
import React from "react";
import moment from 'moment-es6';
import PropTypes from "prop-types";
import exact from 'prop-types-exact';
```

*   `React`: The React library, used for building user interfaces.
*   `moment`: A JavaScript date formatting library, used to format dates in the chart float data.
*   `PropTypes`: A library for validating props in React components.
*   `exact`: A function from `prop-types-exact` that creates a new set of prop types with exact matching.

### ChartFloat Component

```javascript
const ChartFloat = (props) => {
  const { point, data } = props;

  return (
    <>
      {point ?
        <div className="chart-float">
          {/* Format the date string using moment.js */}
          <strong>{moment(point.data.time).format("MMMM Do")}</strong>
          {/* Render a table to display the chart float data */}
          <table>
            <tbody>
              <tr>
                <td>Confirmed:</td>
                <td className={"confirmed"}>
                  {data.series.confirmed[point.data.pos].toLocaleString()}
                </td>
              </tr>
              <tr>
                <td>Deaths:</td>
                <td className={"deaths"}>
                  {data.series.deaths[point.data.pos].toLocaleString()}
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

*   `const ChartFloat = (props) => { ... }`: Defines a new React functional component, `ChartFloat`, which takes an object of props.
*   `{point ? ... : null}`: Conditionally renders the chart float container only if the `point` prop is truthy.

### Props Validation

```javascript
export default ChartFloat;

ChartFloat.propTypes = exact({
  data: PropTypes.object.isRequired,
  point: PropTypes.object,
});
```

*   `ChartFloat.propTypes`: Defines a set of prop types for the `ChartFloat` component using `exact`.
*   `data: PropTypes.object.isRequired`: The `data` prop is required and must be an object.
*   `point: PropTypes.object`: The `point` prop is optional and can be any type of object.

### Usage

To use this component, you would import it in another file and pass the necessary props:

```javascript
import React from "react";
import ChartFloat from "./ChartFloat";

const data = {
  series: {
    confirmed: [...],
    deaths: [...]
  }
};

const pointData = {
  data: {
    time: "2022-01-01"
  },
  pos: 0
};

function App() {
  return (
    <div>
      <ChartFloat data={data} point={pointData} />
    </div>
  );
}
```

This example imports the `ChartFloat` component and passes in a `data` object, which contains two series of COVID-19 data (`confirmed` and `deaths`). The `pointData` object is passed as the second prop to the `ChartFloat` component, containing the necessary data for the chart float.