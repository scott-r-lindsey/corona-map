**TrackedRoute.jsx**
======================

### Overview

The `TrackedRoute` component is a custom route component that integrates with Google Analytics (GA) to track page views. It is designed to work seamlessly with React Router.

### Importing Dependencies

```jsx
import React, { useEffect } from 'react';
import { Route } from 'react-router-dom';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
```

*   `React` and `useEffect` are imported from the React library, used for functional component implementation and handling side effects.
*   `Route` is a component from `react-router-dom`, providing routing functionality for React applications.
*   `ReactGA` is an integration with Google Analytics, allowing tracking of page views and other events in the application.
*   `PropTypes` is imported to define the expected prop types for the component.
*   `exact` is used to specify exact prop type definitions.

### TrackedRoute Component

```jsx
const TrackedRoute = (props) => {
  const { location } = props;

  // Effect hook to track page views with Google Analytics
  useEffect(() => {
    // Disable analytics during tests by checking the global.test property
    if (!global.test) {
      const page = location.pathname;

      ReactGA.set({ page });
      ReactGA.pageview(page);
    }
  }, [location.pathname]);

  return (
    // Render the Route component with props spread from TrackedRoute
    <Route {...props} />
  );
};
```

*   The `TrackedRoute` functional component takes `props` as its argument, which includes a `location` object.
*   The `useEffect` hook is used to track page views when the component mounts or updates. This effect:
    *   Checks if analytics should be disabled during tests by checking the `global.test` property.
    *   If not in test mode, sets and tracks the current page view using `ReactGA.set` and `ReactGA.pageview`.
*   The `Route` component from `react-router-dom` is rendered with its props spread from `TrackedRoute`. This ensures that the route's props are properly passed to the underlying route.

### Default Props

```jsx
TrackedRoute.defaultProps = {
  location: {},
  computedMatch: {},
};
```

*   Default props for the component are defined, including an empty `location` object and an empty `computedMatch` object. These default values will be used if no explicit props are provided when rendering the component.

### Prop Types

```jsx
TrackedRoute.propTypes = exact({
  location: PropTypes.object,
  computedMatch: PropTypes.object,
  path: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
});
```

*   The `propTypes` object defines the expected prop types for the component.
    *   `location` and `computedMatch` are objects, indicating that they must be provided as props.
    *   `path` is a required string prop, representing the route's path.
    *   `children` is an element prop, ensuring that child elements are rendered within this route.

### Exporting Component

```jsx
export default TrackedRoute;
```

*   The `TrackedRoute` component is exported as the default export of this file.