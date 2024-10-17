**mapUrl.js**
================

### Overview

This JavaScript file defines a function, `updateUrl`, which generates a URL string based on the provided data object. The generated URL is used to identify specific map data.

### `updateUrl` Function
---------------------------

#### Purpose

The `updateUrl` function takes two arguments: `current` and `changes`. It returns a formatted URL string that represents the updated data.

#### Parameters

*   **`current`**: An object representing the current state of the data.
*   **`changes`**: An object containing changes to be applied to the `current` state.

#### Return Value

A formatted URL string, e.g., `/mode/when/axis/quant/location`.

#### Implementation

```javascript
/**
 * Generates a URL string based on the provided data object.
 *
 * @param {Object} current - The current state of the data.
 * @param {Object} changes - Changes to be applied to the `current` state.
 */
const updateUrl = (current, changes) => {
  // Merge the `current` and `changes` objects into a single `update` object.
  const update = { ...current, ...changes };

  // Destructure properties from the `update` object.
  const {
    mode,
    when,
    axis,
    quant,
    location, // Added 'location' property to destructuring
  } = update;

  // Return the formatted URL string using template literals.
  return `/${mode}/${when}/${axis}/${quant}/${location}`;
};

export default updateUrl;
```

### Example Usage

```javascript
const currentData = {
  mode: 'choropleth',
  when: '2020',
  axis: 'population',
  quant: 'density',
  location: 'usa',
};

const changes = {
  mode: 'heatmap',
  when: '2021',
  quant: 'size',
  location: 'world',
};

const urlString = updateUrl(currentData, changes);
console.log(urlString); // Output: /heatmap/2021/size/world
```

### Notes

*   The `updateUrl` function assumes that the `current` and `changes` objects have the same structure.
*   If a property is not present in either object, it will be ignored during merging.