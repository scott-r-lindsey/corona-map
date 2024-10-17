# getMapValue.js Documentation

This file consists of various functions that manipulate and retrieve data related to locations and their corresponding time series data. The primary purpose is to process and present data for visualization on a map, specifically in the context of COVID-19 data. The file also includes utility functions for data manipulation and formatting.

## Imports

```js
import moment from 'moment-es6';
```

The `moment` library is imported to handle date formatting.

## Functions

### getLocationFips(data)

```js
export const getLocationFips = (data) => {
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

This function extracts location FIPS codes and names into an array of objects and filters out any FIPS codes that match the pattern `^\d\d000$`. The resulting array is sorted by the FIPS code and returned.

### deepClone(parent)

```js
export const deepClone = (parent) => JSON.parse(JSON.stringify(parent));
```

This utility function creates a deep copy of an object by serializing it to JSON and then parsing it back into an object.

### getStateDataByName(data, location)

```js
export const getStateDataByName = (data, location) => Object.entries(data.location).filter(
  (item) => item[1].name.toLowerCase() === location,
)[0][1];
```

This function retrieves state data by its name. It filters the entries in the `data.location` object to find the matching location name and returns the corresponding state data.

### getDataValue(data, when, location, axis, addl = 0)

```js
export const getDataValue = (data, when, location, axis, addl = 0) => {
  const [, max] = parseWhen(data, when, addl);
  const stateData = getStateDataByName(data, location);
  return stateData.series[axis][max];
};
```

This function retrieves a specific data value for a given location, date, and axis. It uses the provided `when` parameter to determine the appropriate time index.

### getDataValueById(data, when, id, axis, addl = 0)

```js
export const getDataValueById = (data, when, id, axis, addl = 0) => {
  const [, max] = parseWhen(data, when, addl);
  const stateData = data.location[id];
  return stateData.series[axis][max];
};
```

Similar to `getDataValue`, this function retrieves a specific data value using the location ID instead of the location name.

### getDate(data, when)

```js
export const getDate = (data, when) => {
  const [, max] = parseWhen(data, when);
  return data.dates[max];
};
```

This function retrieves the date corresponding to the provided `when` parameter from the `data.dates` array.

### getFormattedDate(data, when, format)

```js
export const getFormattedDate = (data, when, format) => moment(getDate(data, when)).format(format);
```

This function formats the date returned by `getDate` using the specified format string.

### getPop(data, location)

```js
export const getPop = (data, location) => getStateDataByName(data, location).pop;
```

This function retrieves the population of a specific location.

### getMaxValueForAxis(data, axis)

```js
export const getMaxValueForAxis = (data, axis) => {
  const days = data.dates.length;

  return Math.max(
    ...Object.entries(data.location)
      .filter((o) => !o[1].rollup)
      .map(
        (o) => o[1].series[axis][days - 1],
      ), 0,
  );
};
```

This function calculates the maximum value for a specified axis across all locations, excluding those marked as `rollup`.

### getLocationDataForDay(data, when, location)

```js
export const getLocationDataForDay = (data, when, location) => ({
  location,
  pop: getPop(data, location),
  date: getDate(data, when),
  axis: {
    confirmed: getDataValue(data, when, location, 'confirmed'),
    deaths: getDataValue(data, when, location, 'deaths'),
    confirmedPercap: getDataValue(data, when, location, 'confirmed-percap'),
    deathsPercap: getDataValue(data, when, location, 'deaths-percap'),
  },
});
```

This function retrieves a summary of data for a specific location and date, including population and values for various axes.

### getLocationDataForDayById(data, when, id)

```js
export const getLocationDataForDayById = (data, when, id) => ({
  location: data.location[id].name.toLowerCase(),
  pop: data.location[id].pop,
  date: getDate(data, when),
  axis: {
    confirmed: getDataValueById(data, when, id, 'confirmed'),
    deaths: getDataValueById(data, when, id, 'deaths'),
    confirmedPercap: getDataValueById(data, when, id, 'confirmed-percap'),
    deathsPercap: getDataValueById(data, when, id, 'deaths-percap'),
  },
});
```

Similar to `getLocationDataForDay`, this function retrieves data using the location ID instead of the name.

### getTrimmedData(sourceData, when)

```js
export const getTrimmedData = (sourceData, when) => {
  const data = deepClone(sourceData);
  const [min, max] = parseWhen(data, when);

  if (min >= max) {
    return {
      ...data,
      raw: data,
    };
  }

  const trimArray = (item, index) => ((index >= min) && (index <= max));

  const trimmed = deepClone(data);
  trimmed.dates = data.dates.filter(trimArray);

  for (const [id, state] of Object.entries(trimmed.location)) {
    for (const [axis, values] of Object.entries(state.series)) {
      state.series[axis] = values.filter(trimArray);
    }
  }

  trimmed.raw = data;

  return trimmed;
};
```

This function trims the data to include only the necessary date range specified by the `when` parameter. It deep clones the data to avoid mutating the original object and filters the dates and series data accordingly.

### parseWhen(data, when, addl = 0)

```js
export const parseWhen = (data, when, addl = 0) => {
  let found;

  if (when.startsWith('-')) {
    return [0 + addl, data.dates.length - -(when) - 1 + addl];
  }
  if (found = when.match(/^(\d+)-(\d+)$/)) {
    return [
      Number.parseInt(found[1], 10) + addl,
      Number.parseInt(found[2], 10) + addl,
    ];
  }

  return [0 + addl, data.dates.length - 1 + addl];
};
```

This function parses the `when` parameter to determine the appropriate date range. It supports relative ranges (e.g., "-7") and absolute ranges (e.g., "0-10").

### capitalizeLocation(location)

```js
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

This function capitalizes the first letter of each word in a location name and appends " of America" if the location is "united states". It also ensures that state abbreviations are uppercase.

### abbreviateNumber(num)

```js
export const abbreviateNumber = (num) => {
  if (num === null) { return null; }
  if (num === 0) { return '0'; }
  const b = (num).toPrecision(2).split('e');

  const k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3);

  const c = k < 1 ? num.toFixed(0) : (num / Math.pow(10, k * 3)).toFixed(1);
  const d = c < 0 ? c : Math.abs(c);
  const e = d + ['', 'K', 'M', 'B', 'T'][k];
  return e;
};
```

This function abbreviates large numbers into a more readable format (e.g., 1,000 becomes "1K", 1,000,000 becomes "1M").

### embellishData(data)

```js
export const embellishData = (data) => {
  const axes = ['confirmed', 'deaths'];

  for (const locationId in data.location) {
    if (Object.prototype.hasOwnProperty.call(data.location, locationId)) {
      axes.forEach((axis) => {
        data.location[locationId].series[`${axis}-total`] = data.location[locationId].series[axis];
        data.location[locationId].series[`${axis}-change`] = [];

        const { pop } = data.location[locationId];
        data.location[locationId].series[`${axis}-percap`] = data.location[locationId].series[axis].map((count) => (count / pop) * 1000);

        data.location[locationId].series[`${axis}-change`] = data.location[locationId].series[axis].map((count, index) => (index === 0 ? 0
          : count - data.location[locationId].series[axis][index - 1]));
      });
    }
  }

  return data;
};
```

This function adds additional series data to each location including total counts, per capita counts, and daily changes for both confirmed cases and deaths.

## Summary

This file provides a comprehensive set of functions for handling, manipulating, and retrieving COVID-19 related data by location and date. The functions include utilities for deep cloning, date parsing, data trimming, and number formatting, making it easier to prepare and present the data for visualization on a map.