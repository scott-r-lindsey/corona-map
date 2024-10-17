**QuantPicker.js**
================

**Overview**

The `QuantPicker` component is a React functional component responsible for rendering a vertical tab navigation menu that allows users to select different map quant values.

**Imports**

*   `React` from 'react' - The React library for building user interfaces.
*   `{ useParams, useHistory }` from "react-router-dom" - Hooks for managing browser history and URL parameters in a React application.
*   `updateUrl` from '../../lib/mapUrl' - A function that updates the URL parameter values based on the selected quant value.
*   `Tabs` and `Tab` from '@material-ui/core' - Material-UI components for creating tab navigation.

**Component Definition**

```javascript
const QuantPicker = () => {
```

The `QuantPicker` component is defined as a functional React component, which means it does not have its own state or lifecycle methods. It uses the `useParams` and `useHistory` hooks to manage browser history and URL parameters.

**Variable Declarations**

```javascript
  const params = useParams();
  const history = useHistory();

  const { quant } = params;
```

*   `params`: The URL parameter object retrieved using the `useParams` hook.
*   `history`: The browser history object retrieved using the `useHistory` hook.
*   `quant`: The selected map quant value retrieved from the `params` object.

**Quant Options**

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

The `quants` array contains objects representing the different map quant values that can be selected. Each object has a unique `name` and `display` property, which is used to render the tab label.

** handleChange Function**

```javascript
  const handleChange = (event, newValue) => {
    history.push(updateUrl(params, {quant: newValue}));
  };
```

The `handleChange` function is called when a tab is clicked. It updates the URL parameter value using the `updateUrl` function and navigates to the new URL.

**a11yProps Function**

```javascript
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
```

The `a11yProps` function returns an object with props for the tab element, including an ID and an attribute for accessibility.

**JSX Render**

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
};
```

The JSX render returns a vertical tab navigation menu with the selected quant value displayed as the initial `value` prop. When a tab is clicked, the `handleChange` function is called to update the URL parameter value.

**Export**

```javascript
export default QuantPicker;
```

The `QuantPicker` component is exported as the default export of the module.

**Key Logic**

*   The `QuantPicker` component uses the `useParams` and `useHistory` hooks to manage browser history and URL parameters.
*   The `handleChange` function updates the URL parameter value using the `updateUrl` function when a tab is clicked.
*   The `a11yProps` function returns props for the tab element, including an ID and an attribute for accessibility.
*   The JSX render displays a vertical tab navigation menu with the selected quant value displayed as the initial `value` prop.