# RouteValidator.jsx Detailed Documentation

## Overview

The `RouteValidator.jsx` file is a React component responsible for validating URL parameters and redirecting users if parameters are invalid. It ensures that the application routes are consistent with the defined rules before rendering the main content.

## Imports

```jsx
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Main from './index';
import { home } from '../lib/config';
import updateUrl from '../lib/mapUrl';
```

- **React**: Core library for building user interfaces.
- **useParams**: A hook from `react-router-dom` to access URL parameters.
- **Redirect**: A component from `react-router-dom` to redirect users.
- **PropTypes**: Library for type-checking of props.
- **exact**: A utility from `prop-types-exact` to ensure no extra props are passed.
- **Main**: Main component to render if validation passes.
- **home**: Home URL from the configuration file.
- **updateUrl**: Utility function to update and construct URLs.

## Constants

```jsx
const validModes = ['COVID-COUNTY', 'COVID-US'];
const validAxes = ['deaths', 'confirmed'];
const validQuants = ['total', 'percap', 'change'];
```

- **validModes**: List of valid modes for the application.
- **validAxes**: List of valid axes for data representation.
- **validQuants**: List of valid quantitative measures.

## RouteValidator Component

```jsx
const RouteValidator = (props) => {
  const params = useParams();
  const { data } = props;
  const {
    mode, location, when, axis, quant,
  } = params;
```

- **useParams**: Retrieves URL parameters.
- **data**: Prop containing the data to be used in the component.
- **params**: Destructuring the URL parameters for easier access.

### Mode Validation

```jsx
  // validate mode
  if (!validModes.includes(mode)) {
    return (
      <Redirect to={home} />
    );
  }
```

- Checks if the `mode` parameter is in the list of valid modes. If not, redirects to the home URL.

### Axis Validation

```jsx
  // validate axes
  if (!validAxes.includes(axis)) {
    return (
      <Redirect to={home} />
    );
  }
```

- Checks if the `axis` parameter is in the list of valid axes. If not, redirects to the home URL.

### Quantitative Measure Validation

```jsx
  // validate quant
  if (!validQuants.includes(quant)) {
    return (
      <Redirect to={home} />
    );
  }
```

- Checks if the `quant` parameter is in the list of valid quantitative measures. If not, redirects to the home URL.

### Data and Location Preparation

```jsx
  const modeData = mode === 'COVID-COUNTY'
    ? data.county
    : data.state;

  const locationNames = mode === 'COVID-COUNTY'
    ? Object.entries(data.county.location).map((s) => (s[1].name.toLowerCase()))
    : Object.entries(data.state.location).map((s) => (s[1].name.toLowerCase()));
```

- **modeData**: Selects the appropriate data based on the `mode` parameter.
- **locationNames**: Creates a list of valid location names based on the selected mode.

### Location Validation

```jsx
  const updates = {};

  // validate location
  if (!locationNames.includes(location)) {
    updates.location = 'united states';
  }
```

- Initializes an `updates` object to store any necessary updates to the URL parameters.
- Checks if the `location` parameter is valid. If not, sets a default location.

### When Parameter Validation

```jsx
  // validate when
  if (!(
    when === 'now'
      || when.match(/^-[\d]+$/)
      || when.match(/^([\d]+)-([\d]+)$/)
  )) {
    updates.when = 'now';
  }
  if (when.match(/^-[\d]+$/)) {
    if (modeData.dates.length < (-1 * when)) {
      updates.when = 'now';
    }
  }
```

- Validates the `when` parameter to ensure it is either 'now', a negative number (representing days ago), or a date range.
- If the `when` parameter is a negative number, it checks if the data length supports that range. If not, sets the `when` parameter to 'now'.

### Redirection Logic

```jsx
  // redirect if appropriate
  if (Object.keys(updates).length) {
    const url = updateUrl(params, updates);

    return (
      <Redirect to={url} />
    );
  }
```

- If any updates are needed, constructs a new URL with the `updateUrl` utility and redirects to the updated URL.

### Rendering Main Component

```jsx
  return (
    <Main data={modeData} />
  );
```

- If all validations pass, renders the `Main` component with the appropriate data.

## PropTypes Validation

```jsx
RouteValidator.propTypes = exact({
  data: PropTypes.object.isRequired,
});
```

- Ensures that the `data` prop is an object and is required. Uses `exact` to ensure no extra props are passed.

## Export

```jsx
export default RouteValidator;
```

- Exports the `RouteValidator` component as the default export.

## Summary

The `RouteValidator.jsx` component is crucial for validating URL parameters and ensuring the application renders valid data. It redirects users to appropriate URLs if any parameter is invalid and ensures a consistent and error-free user experience.