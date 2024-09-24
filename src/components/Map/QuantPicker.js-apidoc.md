# QuantPicker Component Documentation

## Overview

The `QuantPicker` component provides a user interface for selecting a quantitative measure to display on a map. It is built using React and Material-UI's tab components. The component leverages React Router's hooks to manage URL parameters and navigation.

## Imports

```javascript
import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
```
- **React**: A JavaScript library for building user interfaces.
- **useParams**: A hook from `react-router-dom` to access URL parameters.
- **useHistory**: A hook from `react-router-dom` to navigate programmatically.
- **updateUrl**: A custom function (assumed to be defined elsewhere) for updating the URL with new parameters.
- **Tabs** and **Tab**: Components from Material-UI to render a set of tabs.

## Component Definition

### QuantPicker

The `QuantPicker` component is defined as a functional component.

```javascript
const QuantPicker = () => {
```

### Hooks: `useParams` and `useHistory`

```javascript
const params = useParams();
const history = useHistory();
```
- **params**: An object containing the current URL parameters.
- **history**: An object for programmatic navigation.

### Extracting `quant` from URL Parameters

```javascript
const { quant } = params;
```
- **quant**: Destructured from the `params` object, representing the current quantitative measure selected in the URL.

### Quantitative Options

```javascript
const quants = [
  {
    name: 'total',
    display:'total',
  },
  {
    name: 'percap',
    display:'per/cap',
  },
/*
  {
    name: 'change',
    display:'change',
  },
*/
];
```
- **quants**: An array of objects, each representing a quantitative measure option. Each object has:
  - `name`: The internal value used in the URL.
  - `display`: The label displayed in the UI.
- The `change` option is commented out, indicating it is not currently available but may be added in the future.

### Handling Tab Changes

```javascript
const handleChange = (event, newValue) => {
  history.push(updateUrl(params, { quant: newValue }));
};
```
- **handleChange**: A function triggered when a tab is selected. It updates the URL with the new `quant` value using the `updateUrl` function and `history.push`.

### Accessibility Properties

```javascript
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
```
- **a11yProps**: A helper function that returns accessibility properties for tabs, useful for screen readers and improving usability.

### Render Method

```javascript
return (
  <div className={"map-quant-picker map-picker"}>
    <Tabs
      orientation="vertical"
      onChange={handleChange}
      aria-label="Choose Map Quant"
      value={quant}
    >
      {
        quants.map((val, index) => {
          return (
            <Tab key={val.name} value={val.name} label={val.display} {...a11yProps(index)} />
          )
        })
      }
    </Tabs>
  </div>
);
```
- **<div className={"map-quant-picker map-picker"}>**: A container div with CSS classes for styling.
- **<Tabs>**: The Material-UI `Tabs` component configured for vertical orientation.
  - `orientation="vertical"`: Specifies the tabs should be displayed vertically.
  - `onChange={handleChange}`: Sets the event handler for tab changes.
  - `aria-label="Choose Map Quant"`: Provides an accessible label for the tabs.
  - `value={quant}`: Binds the currently selected tab to the `quant` value from the URL parameters.
- **Tab**: The Material-UI `Tab` component rendered for each quantitative option.
  - `key={val.name}`: Unique key for each tab.
  - `value={val.name}`: The internal value of the tab.
  - `label={val.display}`: The display label for the tab.
  - `{...a11yProps(index)}`: Spread operator to add accessibility properties.

## Export

```javascript
export default QuantPicker;
```
- **export default QuantPicker**: Exports the `QuantPicker` component as the default export of the module.

## Summary

The `QuantPicker` component allows users to select different quantitative measures to be displayed on a map. It uses React Router for managing URL state and Material-UI for the tabbed interface. The component is designed with accessibility in mind and is easily extensible to add more quantitative options in the future.