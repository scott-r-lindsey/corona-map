## AxisPicker.js Documentation

### Overview
`AxisPicker.js` is a React component that provides a user interface for selecting the axis (data type) displayed on a map. It uses Material-UI components for the UI and React Router for handling URL changes and navigation.

### Imports
- **React:** The core library for building the user interface.
- **useParams & useHistory (react-router-dom):** Hooks from React Router used to access route parameters and navigate programmatically.
- **updateUrl (../../lib/mapUrl):** A utility function to update the URL with new parameters.
- **Tabs & Tab (material-ui/core):** Components from Material-UI for creating tabbed navigation.

```javascript
import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import updateUrl from '../../lib/mapUrl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
```

### Component: AxisPicker

#### State Management
- **params:** Obtained by calling `useParams()`, this hook returns an object of key/value pairs from the URL.
- **history:** Obtained by calling `useHistory()`, this hook provides access to the history instance used for navigation.
- **axis:** Destructured from `params`, representing the current axis selected in the URL.

```javascript
const AxisPicker = () => {
  const params = useParams();
  const history = useHistory();
  const { axis } = params;
```

#### Data
- **axes:** An array of objects containing the possible axes (`confirmed` and `deaths`) and their display names (`cases` and `deaths`).

```javascript
  const axes = [
    {
      name: 'confirmed',
      display: 'cases',
    },
    {
      name: 'deaths',
      display: 'deaths',
    },
  ];
```

#### Functions

1. **handleChange:** This function is called when the selected tab is changed. It uses `history.push` to update the URL with the new axis value by calling the `updateUrl` function.

```javascript
  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, { axis: newValue }));
  };
```

2. **a11yProps:** This function generates accessibility props for each tab, ensuring that they are properly labeled and controlled.

```javascript
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
```

### JSX Structure

- **Container `div`:** The root `div` with class names `map-axis-picker` and `map-picker`.
- **Tabs:** The `Tabs` component from Material-UI, configured to be vertical, with an `onChange` event handler and an `aria-label`.
- **Tab:** Iterates through the `axes` array to create a `Tab` for each axis. Each tab is given a `key`, `value`, `label`, and accessibility props from `a11yProps`.

```javascript
  return (
    <div className={"map-axis-picker map-picker"}>
      <Tabs
        orientation="vertical"
        onChange={handleChange}
        aria-label="Choose Map Axis"
        value={axis}
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
}
```

### Export
- **default:** The `AxisPicker` component is exported as the default export of the module.

```javascript
export default AxisPicker;
```

### Summary
The `AxisPicker` component is a React functional component that provides a vertical tab interface for switching between different map axes (confirmed cases and deaths). It integrates with React Router to update the URL based on user interactions, ensuring the current axis is reflected in the URL. The component uses Material-UI for the tabs and includes accessibility features via the `a11yProps` function.