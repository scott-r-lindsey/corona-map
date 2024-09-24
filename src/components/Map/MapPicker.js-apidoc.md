Below is a detailed documentation for the `MapPicker.js` file located at `/var/www/html/scott/corona-map/src/MapPicker.js`.

## Overview
The `MapPicker` component provides an interface for selecting between different map views, specifically related to COVID-19 data. The component uses Material-UI's `Tabs` and `Tab` components to create a vertical tab menu, allowing users to select between different map modes (e.g., "states" and "counties"). It also utilizes React Router's `useParams` and `useHistory` hooks for URL manipulation and navigation.

## Import Statements
```javascript
import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
```
- `React`: The core React library for building the component.
- `useParams` and `useHistory`: Hooks from `react-router-dom` for accessing route parameters and programmatic navigation.
- `updateUrl`: A custom utility function for updating the URL with new parameters.
- `Tabs` and `Tab`: Components from Material-UI for creating tabbed navigation.

## `MapPicker` Component
The `MapPicker` function component defines the main logic and UI for the map selection interface.

### State and Variables
```javascript
const params = useParams();
const history = useHistory();
const { mode } = params;
```
- `params`: An object containing the URL parameters.
- `history`: An object used for navigating programmatically.
- `mode`: Destructured from `params`, representing the current map mode selected.

### Map Modes
```javascript
const axes = [
  {
    name: 'COVID-US',
    display:'states',
  },
  {
    name: 'COVID-COUNTY',
    display:'counties',
  },
];
```
- `axes`: An array of objects, each representing a map mode with a `name` for internal identification and a `display` name for user-friendly display.

### `handleChange` Function
```javascript
const handleChange = (event, newValue) => {
  history.push(updateUrl(params, {mode: newValue, when: 'now'}));
};
```
- `handleChange`: A function called when the tab selection changes.
  - `event`: The event object.
  - `newValue`: The new value of the selected tab.
- The function updates the URL with the new map mode using `updateUrl` and navigates to the updated URL using `history.push`.

### `a11yProps` Function
```javascript
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
```
- `a11yProps`: A helper function to provide accessibility properties for each tab.
  - `index`: The index of the tab.
- Returns an object with `id` and `aria-controls` properties for accessibility.

### JSX Return
```javascript
return (
  <div className={"map-map-picker map-picker"}>
    <Tabs
      orientation="vertical"
      onChange={handleChange}
      aria-label="Choose Map Map"
      value={mode}
    >
      {
        axes.map((val, index) => {
          return (
            <Tab key={val.name} value={val.name} label={val.display} {...a11yProps(index)} />
          )
        })
      }
    </Tabs>
  </div>
);
```
- Returns a `div` containing a vertical `Tabs` component.
- `Tabs` component:
  - `orientation="vertical"`: Specifies vertical orientation.
  - `onChange={handleChange}`: Attaches the `handleChange` function.
  - `aria-label="Choose Map Map"`: Accessibility label.
  - `value={mode}`: Sets the current selected tab based on `mode`.
- `axes.map`: Iterates over the `axes` array to generate a list of `Tab` components.
  - Each `Tab` component receives a `key`, `value`, `label`, and accessibility properties from `a11yProps`.

## Export Statement
```javascript
export default MapPicker;
```
- Exports the `MapPicker` component as the default export of the module.

## Summary
The `MapPicker` component is a specialized UI element for selecting between different COVID-19 map views. It employs React Router for URL parameter handling and navigation, and Material-UI for the tabbed interface. The component is designed with accessibility in mind, ensuring that each tab is properly labeled and controlled.