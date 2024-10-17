# App.jsx Documentation

## Overview
`App.jsx` is the main component file for the Corona Map application. This file sets up the primary structure and behavior of the application, including theme configuration, data fetching, and routing. It leverages React for the frontend framework, Material-UI for styling, and React Router for navigation.

## Imports
- **React, { useState, useEffect }**: Core React library and hooks for managing component state and lifecycle.
- **'./styles/App.scss'**: Custom SCSS styles for the application.
- **{ ThemeProvider, createMuiTheme } from '@material-ui/core/styles'**: Material-UI components for theming.
- **{ Redirect, BrowserRouter as Router, Switch } from 'react-router-dom'**: React Router components for navigation and routing.
- **{ home } from './lib/config'**: Configuration file containing the home route.
- **{ primary, secondary } from './lib/colors'**: Color definitions used in the theme.
- **TrackedRoute**: Custom component for tracking routes.
- **RouteValidator**: Component for validating routes based on data.
- **{ embellishData } from './lib/getMapValue'**: Function to enhance the fetched data.
- **Veil**: Component representing a loading or veil screen.
- **VeilContext**: Context for managing the state of the veil.
- **node-fetch**: Library for fetching data from the server.

## Constants

### dataUrl
```javascript
const dataUrl = '/data/full.json';
```
Defines the URL from which to fetch the data.

### breakpoints
```javascript
const breakpoints = {
  xs: 0,
  sm: 680,
  md: 1060,
  lg: 1280,
  xl: 1920,
};
```
Defines the breakpoints for responsive design.

### theme
```javascript
const theme = createMuiTheme({
  breakpoints: { values: breakpoints },
  palette: {
    primary: { main: primary },
    secondary: { main: secondary },
  },
  status: {
    danger: 'orange',
  },
});
```
Creates a custom Material-UI theme using the defined breakpoints and color palette.

## App Component
The `App` component is the root component of the application.

### State Variables
- **data**: Holds the fetched data from the server.
- **veil**: Manages the visibility of the veil component.

### useEffect Hook
```javascript
useEffect(() => {
  (async () => {
    await fetch(dataUrl, { method: 'GET' })
      .then((res) => res.json())
      .then((parsed) => {
        embellishData(parsed.state);
        embellishData(parsed.county);
        setData(parsed, []);
      });
  })();
}, []);
```
Fetches the data from the server on component mount, processes it using `embellishData`, and sets it into the state.

### Conditional Rendering
The component conditionally renders based on whether the `data` state is populated.

#### Data Loaded
When `data` is successfully loaded:
```javascript
<ThemeProvider theme={theme}>
  <VeilContext.Provider value={{ veil, setVeil }}>
    <Router>
      <Switch>
        <TrackedRoute path="/:mode/:when/:axis/:quant/:location">
          <RouteValidator data={data} />
        </TrackedRoute>
        <TrackedRoute path="/">
          <Redirect to={home} />
        </TrackedRoute>
      </Switch>
    </Router>
    <Veil />
  </VeilContext.Provider>
</ThemeProvider>
```
- **ThemeProvider**: Provides the custom Material-UI theme to the entire application.
- **VeilContext.Provider**: Provides the veil state context to the entire application.
- **Router**: Wraps the routing logic.
- **Switch**: Switches between different routes.
  - **TrackedRoute**: Custom route component for tracking.
    - **RouteValidator**: Validates the route based on the data.
    - **Redirect**: Redirects to the home route if the path is "/".

#### Data Not Loaded
When `data` is still being fetched:
```javascript
<div style={{
  backgroundColor: primary,
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  justifyContent: 'center',
}}
>
  <div className="loading-animation">
    <div />
    <div />
    <div />
  </div>
</div>
```
Displays a loading animation with a background color matching the primary theme color.

## Export
```javascript
export default App;
```
Exports the `App` component as the default export of the file.