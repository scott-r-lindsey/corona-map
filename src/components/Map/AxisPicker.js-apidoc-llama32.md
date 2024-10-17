**AxisPicker.js**
================

### Overview

This is a React component that provides an axis picker for a map view. It allows users to select from two axes: confirmed cases and deaths.

### Dependencies

* `React` for building the user interface
* `react-router-dom` for handling URL updates
* `@material-ui/core` for using Material-UI components

### Functions and Classes

#### Functions

* **`updateUrl(params, axis)`**: Updates the URL with a new parameter `axis`. This function is used to update the URL when the user selects a new axis.
	+ Parameters: `params` (object containing current URL parameters) and `axis` (string representing the selected axis)
	+ Returns: The updated URL string
* **`a11yProps(index)`**: Returns accessibility properties for a Material-UI Tab component. These properties are used to improve screen reader support.
	+ Parameters: `index` (number representing the current tab index)
	+ Returns: An object containing `id`, `aria-controls`, and other accessibility-related properties

#### Classes

* **None**

### Key Logic

The key logic of this component is in the `handleChange` function, which updates the URL when a new axis is selected. Here's how it works:

1. The `history.push` function is called with the updated URL.
2. The `updateUrl` function is used to generate the updated URL string.

### Code

```javascript
import React from 'react'
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/**
 * AxisPicker component.
 *
 * @returns {JSX.Element} The JSX element representing the axis picker.
 */
const AxisPicker = () => {

  // Get URL parameters and history object
  const params = useParams();
  const history = useHistory();

  // Get selected axis from URL parameters
  const { axis } = params;

  // Define available axes
  const axes = [
    {
      name: 'confirmed',
      display:'cases',
    },
    {
      name: 'deaths',
      display:'deaths',
    },
  ];

  /**
   * Handles changes to the selected axis.
   *
   * @param {Event} event The change event triggered by Material-UI Tab component.
   * @param {string} newValue The new value of the selected axis.
   */
  const handleChange = (event, newValue) => {
    // Update URL with new axis
    history.push(updateUrl(params, {axis: newValue}));
  };

  /**
   * Returns accessibility properties for a Material-UI Tab component.
   *
   * @param {number} index The current tab index.
   * @returns {Object} An object containing accessibility-related properties.
   */
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  // Render the axis picker
  return (
    <div className={"map-axis-picker map-picker"}>

      {/* Use Material-UI Tabs component to render axis picker */}
      <Tabs
        orientation="vertical"
        onChange={handleChange}
        aria-label="Choose Map Axis"
        value={axis}
      >
        {
          // Render each axis as a Tab component
          axes.map((val, index) => {
            return (
              <Tab key={val.name} value={val.name} label={val.display} {...a11yProps(index)} />
            )
          })
        }

      </Tabs>
    </div>
  );

}

// Export the AxisPicker component
export default AxisPicker;
```

### Accessibility Notes

This component uses Material-UI components, which have built-in accessibility features. The `a11yProps` function is used to provide accessibility-related properties for each Tab component. These properties include an `id` attribute and an `aria-controls` attribute, which help screen readers navigate the component.