**MapPicker.js**
================

### Overview

The `MapPicker` component is a React-based map picker that allows users to select between two modes: COVID-US and COVID-COUNTY. The selected mode is determined by the URL parameter passed to the application.

### Dependencies

*   React
*   React Router DOM (`useParams`, `useHistory`)
*   Material-UI components (`Tabs`, `Tab`)

### Imports

```javascript
import React from 'react'
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
```

### MapPicker Component

The `MapPicker` component is a functional React component that renders a tabs-based map picker.

```javascript
const MapPicker = () => {
  // Get the mode parameter from URL parameters
  const params = useParams();
  const history = useHistory();

  const { mode } = params;

  // Define axes (maps) for COVID-US and COVID-COUNTY modes
  const axes = [
    {
      name: 'COVID-US',
      display:'states', // Display text for the map
    },
    {
      name: 'COVID-COUNTY',
      display:'counties', // Display text for the map
    }, 
  ];

  /**
   * Handles tab selection change event.
   *
   * Updates the URL parameter with the new mode value and navigates to the updated URL.
   *
   * @param {Event} event - Tab selection change event.
   * @param {string} newValue - New tab value.
   */
  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {mode: newValue, when: 'now'}));
  };

  /**
   * Returns accessibility props for a Tab component.
   *
   * Provides `id` and `aria-controls` attributes to enable screen reader support.
   *
   * @param {number} index - Index of the tab.
   * @returns {{id: string, 'aria-controls': string}} Accessibility props.
   */
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // Render the map picker component
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
};
```

### Export

The `MapPicker` component is exported as the default export of the file.

```javascript
export default MapPicker;
```

### Usage

To use this component, import it in your React application and render it as needed. Pass any required props (none in this case) to the component.

```javascript
import React from 'react';
import MapPicker from './MapPicker';

const App = () => {
  return (
    <div>
      <MapPicker />
    </div>
  );
};
```

### Accessibility

This component is designed to be accessible. The `a11yProps` function returns props that enable screen reader support for the Tab components, ensuring that users with visual impairments can navigate the map picker using their keyboard or other assistive technologies.