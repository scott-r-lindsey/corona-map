**RouteValidator.jsx**
========================

### Overview

The `RouteValidator` component is a React-based route validator that checks the validity of incoming route parameters and redirects the user if necessary.

### Import Statements

```jsx
import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Main from './index';
import { home } from '../lib/config';
import updateUrl from '../lib/mapUrl';
```

*   `React` is the React library used for building user interfaces.
*   `useParams` and `Redirect` are hooks and components from the `react-router-dom` library that handle client-side routing.
*   `PropTypes` is a library used to validate props in React components.
*   `exact` is a function from the `prop-types-exact` library that allows for exact prop type validation.
*   `Main` is the main component of the application.
*   `home` is an object containing the base URL of the application.
*   `updateUrl` is a function that updates the URL based on the incoming route parameters.

### Constants

```jsx
const validModes = ['COVID-COUNTY', 'COVID-US'];
const validAxes = ['deaths', 'confirmed'];
const validQuants = ['total', 'percap', 'change'];
```

*   `validModes`, `validAxes`, and `validQuants` are arrays of valid mode, axis, and quant values respectively.

### RouteValidator Component

```jsx
const RouteValidator = (props) => {
  const params = useParams();
  const { data } = props;
  const {
    mode, location, when, axis, quant,
  } = params;

  // validate mode
  if (!validModes.includes(mode)) {
    return (
      <Redirect to={home} />
    );
  }

  // validate axes
  if (!validAxes.includes(axis)) {
    return (
      <Redirect to={home} />
    );
  }

  // validate quant
  if (!validQuants.includes(quant)) {
    return (
      <Redirect to={home} />
    );
  }
```

*   `useParams` is used to get the current route parameters.
*   The component checks if the incoming mode, axis, and quant values are valid by using the `includes` method on the `validModes`, `validAxes`, and `validQuants` arrays respectively. If any of these values are not valid, the component redirects the user to the base URL (`home`).

### Location Validation

```jsx
const modeData = mode === 'COVID-COUNTY'
  ? data.county
  : data.state;

const locationNames = mode === 'COVID-COUNTY'
  ? Object.entries(data.county.location).map((s) => (s[1].name.toLowerCase()))
  : Object.entries(data.state.location).map((s) => (s[1].name.toLowerCase()));

const updates = {};

// validate location
if (!locationNames.includes(location)) {
  updates.location = 'united states';
}
```

*   Depending on the mode (`COVID-COUNTY` or `COVID-US`), the component retrieves either the county data or state data from the `data` prop.
*   The component then validates the incoming location value by checking if it exists in the `locationNames` array. If it doesn't, the component updates the `updates` object with a new location value (`'united states'`).

### Time Validation

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

*   The component validates the incoming `when` value by checking if it matches certain patterns (`'now'`, a negative integer, or a date range).
*   If none of these patterns match, the component updates the `updates` object with a new `when` value (`'now'`).

### Redirect Logic

```jsx
// redirect if appropriate
if (Object.keys(updates).length) {
  const url = updateUrl(params, updates);

  return (
    <Redirect to={url} />
  );
}
```

*   If there are any updates in the `updates` object, the component redirects the user to a new URL obtained by calling the `updateUrl` function with the incoming route parameters and the updated values.

### Main Component Rendering

```jsx
return (
  <Main data={modeData} />
);
```

*   If no updates are needed, the component renders the `Main` component with the `modeData` prop passed to it.

### Prop Type Validation

```jsx
RouteValidator.propTypes = exact({
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
});
```

*   The component uses the `prop-types-exact` library to validate the props of the `RouteValidator` component. It ensures that the `data` prop is an object.

### Export Statement

```jsx
export default RouteValidator;
```

*   Finally, the component is exported as the default export of the module.