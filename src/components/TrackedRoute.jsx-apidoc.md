# File Documentation: TrackedRoute.jsx

## Overview

The `TrackedRoute.jsx` file is a React component that wraps the `Route` component from `react-router-dom` and integrates Google Analytics page tracking. When the route changes, it sends pageview information to Google Analytics, unless the application is in a testing environment.

## Dependencies

1. **React**: A JavaScript library for building user interfaces.
2. **react-router-dom**: A library for routing in React applications.
3. **react-ga**: A library for Google Analytics integration with React.
4. **prop-types**: A library for type-checking of React props.
5. **prop-types-exact**: A library for ensuring that the prop types are exact.

## Component: TrackedRoute

### Import Statements
```javascript
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
```
- **React**: Imported to use React's functionalities.
- **useEffect**: A React hook that runs side effects in functional components.
- **Route**: A component from `react-router-dom` for defining routes in the application.
- **ReactGA**: Imported to interact with Google Analytics.
- **PropTypes, exact**: Imported for type-checking the component's props.

### Component Definition
```javascript
const TrackedRoute = (props) => {
  const { location } = props;

  useEffect(() => {
    // disable the analytics during tests
    if (!global.test) {
      const page = location.pathname;

      ReactGA.set({ page });
      ReactGA.pageview(page);
    }
  }, [location.pathname]);

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Route {...props} />
  );
};
```

#### Props Destructuring
```javascript
const { location } = props;
```
- Extracts the `location` object from the `props`.

#### useEffect Hook
```javascript
useEffect(() => {
  // disable the analytics during tests
  if (!global.test) {
    const page = location.pathname;

    ReactGA.set({ page });
    ReactGA.pageview(page);
  }
}, [location.pathname]);
```
- **Purpose**: To send pageview information to Google Analytics whenever the route changes.
- **Condition**: Checks if the global `test` variable is not set to disable analytics during tests.
- **Effect**: 
  - `ReactGA.set({ page })`: Sets the current page in the Google Analytics tracker.
  - `ReactGA.pageview(page)`: Sends a pageview to Google Analytics.
- **Dependency Array**: `[location.pathname]` ensures the effect runs only when the `location.pathname` changes.

#### JSX Return
```javascript
return (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Route {...props} />
);
```
- Renders the `Route` component, spreading all props received by `TrackedRoute`.

### Default Props and Prop Types
```javascript
TrackedRoute.defaultProps = {
  location: {},
  computedMatch: {},
};
TrackedRoute.propTypes = exact({
  // eslint-disable-next-line react/forbid-prop-types
  location: PropTypes.object,
  // eslint-disable-next-line react/forbid-prop-types
  computedMatch: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
});
```
- **defaultProps**: Specifies default values for `location` and `computedMatch`.
  - `location`: Default is an empty object.
  - `computedMatch`: Default is an empty object.
- **propTypes**: Type checks for the props.
  - `location`: Must be an object.
  - `computedMatch`: Must be an object.
  - `path`: Must be a string and is required.
  - `children`: Must be a React element and is required.

### Export Statement
```javascript
export default TrackedRoute;
```
- Exports the `TrackedRoute` component as the default export from the module.

## Summary

The `TrackedRoute.jsx` file defines a `TrackedRoute` component that enhances the `Route` component with Google Analytics tracking. The component uses the `useEffect` hook to send pageview information to Google Analytics whenever the route changes, excluding test environments. PropTypes ensure that the component receives the correct types of props, and default props provide fallback values.