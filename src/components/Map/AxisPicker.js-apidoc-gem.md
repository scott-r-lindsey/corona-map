# AxisPicker.js Documentation

## Overview

`AxisPicker.js` is a React component designed to allow users to select different axes on a map interface, related to COVID-19 data visualization. It provides an interface to toggle between different data views, such as 'cases' and 'deaths'. The component uses React Router for handling URL parameters and Material-UI components for the user interface.

## Import Statements

- **React**: The core library for building user interfaces, used here to create a functional component.
- **useParams, useHistory** from `react-router-dom`: Hooks for accessing URL parameters and manipulating browser history, respectively.
- **updateUrl**: A custom utility function for updating the URL based on user actions.
- **Tabs, Tab** from `@material-ui/core`: Material-UI components used to create a tabbed interface.

## Component: AxisPicker

### Variables and Constants

- **params**: Obtained via the `useParams` hook, it provides access to the URL parameters. In this component, it is used to access the current `axis` parameter.
  
- **history**: Obtained via the `useHistory` hook, it allows the component to programmatically navigate the browser history. This is used for updating the URL when the user selects a different tab.

- **axis**: Destructured from `params`, it represents the current axis selected by the user, corresponding to the type of data being viewed (e.g., 'confirmed', 'deaths').

- **axes**: An array of objects, each representing an available axis. Each object includes:
  - `name`: A string used internally to identify the axis.
  - `display`: A string displayed to the user as the label of the tab.

### Functions

- **handleChange(event, newValue)**: 
  - **Parameters**: 
    - `event`: The event object triggered by the tab change.
    - `newValue`: The new value of the selected tab.
  - **Purpose**: Updates the browser's URL to reflect the selected axis. It uses the `updateUrl` function to generate a new URL and the `history.push` method to navigate to this URL.

- **a11yProps(index)**: 
  - **Parameters**: 
    - `index`: The index of the tab, used to generate unique identifiers.
  - **Returns**: An object containing accessibility properties (`id` and `aria-controls`) for each tab, ensuring the component is accessible.

### JSX Structure

- The component returns a `<div>` element with classes `map-axis-picker` and `map-picker`.
- Inside the `<div>`, a Material-UI `<Tabs>` component is rendered with the following properties:
  - `orientation="vertical"`: Displays the tabs vertically.
  - `onChange={handleChange}`: Sets up the function to handle tab changes.
  - `aria-label="Choose Map Axis"`: Provides an accessible label for the tabs group.
  - `value={axis}`: Binds the current selected axis to the value of the tabs.

- The `axes` array is mapped over to create individual `<Tab>` components:
  - `key`: Uses the `name` property to ensure each tab has a unique key.
  - `value`: Sets the value of the tab to the `name` property of the axis object.
  - `label`: Sets the display label of the tab to the `display` property of the axis object.
  - `{...a11yProps(index)}`: Spreads the accessibility properties onto each tab.

### Export

- The `AxisPicker` component is exported as the default export of the module, allowing it to be easily imported and used in other parts of the application.

## Usage

The `AxisPicker` component is designed to be integrated into a larger application where the user can select different axes for a map visualization. By leveraging URL parameters and browser history, it ensures that the selected data type is reflected in the URL, which can be useful for sharing specific views or maintaining state across sessions. Material-UI's tabs provide a straightforward and visually appealing way to navigate between different data views.