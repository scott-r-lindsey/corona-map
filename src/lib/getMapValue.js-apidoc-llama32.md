**getMapValue.js**
================

### Overview

This JavaScript file provides a set of utility functions for manipulating and processing data related to COVID-19 cases in the United States.

### Functions

#### `getLocationFips(data)`

*   Returns an array of objects containing FIPS codes and corresponding location names.
*   Filters out locations with FIPS codes that match the pattern `\d\d000$`.
*   Sorts the resulting array by FIPS code in ascending order.

```javascript
export const getLocationFips = (data) => {
  // mat ui autocomplete fodder
  const locations = [];

  for (const [fips, location] of Object.entries(data.location)) {
    locations.push(
      {
        title: location.name,
        fips,
      },
    );
  }

  const filtered = locations.filter(
    (value) => !value.fips.match(/^\d\d000$/),
  );

  filtered.sort((a, b) => ((a.fips > b.fips) ? 1 : -1));

  return filtered;
};
```

#### `deepClone(parent)`

*   Creates a deep copy of the input object.
*   Uses `JSON.parse(JSON.stringify())` to clone the object.

```javascript
export const deepClone = (parent) => JSON.parse(JSON.stringify(parent));
```

#### `getStateDataByName(data, location)`

*   Returns an object containing COVID-19 data for a specific location by name.
*   Filters the input data's locations array based on the location name and returns the matching entry.

```javascript
export const getStateDataByName = (data, location) => Object.entries(data.location).filter(
  (item) => item[1].name.toLowerCase() === location,
)[0][1];
```

#### `getDataValue(data, when, location, axis, addl = 0)`

*   Returns the COVID-19 data value for a specific date and location.
*   Uses the `parseWhen` function to determine the index of the desired date in the input data's dates array.

```javascript
export const getDataValue = (data, when, location, axis, addl = 0) => {
  const index = parseWhen(data).find((date) => date === (when + addl));
  return data[index].series[axis][location];
};
```

#### `parseWhen(data)`

*   Returns an array of dates corresponding to the input data's indices.
*   Uses a regular expression to match "now" and handles cases with multiple dates.

```javascript
export const parseWhen = (data) => {
  if (data === 'now') return [0];
  else return [
    Number(data.slice(0, -1).split('e')[0]),
    Number(data.slice(0, -1).split('e')[1]),
  ];
};
```

#### `capitalizeLocation(location)`

*   Returns a formatted location string with the first word capitalized and any additional information appended.
*   Handles cases with special formatting for states.

```javascript
export const capitalizeLocation = (location) => {
  let prov = location.split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ') + (location === 'united states' ? ' of America' : '');

  if (prov.match(/, ..$/)) {
    prov = prov.replace(/.$/, (c) => c.toUpperCase());
  }
  return prov;
};
```

#### `abbreviateNumber(num)`

*   Returns an abbreviated version of the input number using scientific notation.
*   Handles cases with zero values and trillions.

```javascript
export const abbreviateNumber = (num) => {
  if (num === null) { return null; }
  if (num === 0) { return '0'; }
  const b = (num).toPrecision(2).split('e');

  // floor at decimals, ceiling at trillions
  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3);

  // divide by power
  const c = k < 1 ? num.toFixed(0) : (num / Math.pow(10, k * 3)).toFixed(1);
  const d = c < 0 ? c : Math.abs(c);
  const e = d + ['', 'K', 'M', 'B', 'T'][k];
  return e;
};
```

#### `embellishData(data)`

*   Returns an enhanced version of the input data with additional series and formatting.
*   Handles cases with total, per capita, and change data.

```javascript
export const embellishData = (data) => {
  /* eslint-disable no-param-reassign */
  const axes = ['confirmed', 'deaths'];

  for (const locationId in data.location) {
    if (Object.prototype.hasOwnProperty.call(data.location, locationId)) {
      axes.forEach((axis) => {
        // total
        data.location[locationId].series[`${axis}-total`] = data.location[locationId].series[axis];
        data.location[locationId].series[`${axis}-change`] = [];

        // percap
        const { pop } = data.location[locationId];
        data.location[locationId].series[`${axis}-percap`] = data.location[locationId].series[axis].map((count) => (count / pop) * 1000);

        // change
        data.location[locationId].series[`${axis}-change`] = data.location[locationId].series[axis].map((count, index) => (index === 0 ? 0 : count - data.location[locationId].series[axis][index - 1]));
      });
    }
  }

  return data;
};
```

### Classes

None.

### Example Usage

```javascript
const data = {
  location: {
    'new york': {
      confirmed: [100, 200, 300],
      deaths: [10, 20, 30]
    },
    'california': {
      confirmed: [500, 600, 700],
      deaths: [50, 60, 70]
    }
  }
};

const enhancedData = embellishData(data);

console.log(enhancedData.location['new york'].series['confirmed-total']);
console.log(abbreviateNumber(1000000));
```