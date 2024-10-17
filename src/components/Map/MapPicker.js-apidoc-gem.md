Here's a detailed documentation for the `MapPicker.js` file, which is a React component used for selecting different map views:

---

### File Overview

The `MapPicker.js` file defines a React functional component named `MapPicker`. This component is part of a web application, possibly a map interface for visualizing COVID-19 data. It allows users to switch between different map views, such as state-level and county-level COVID-19 data.

### Import Statements

- **React**: The component imports `React` to create a functional component using JSX.
- **useParams and useHistory**: These hooks are imported from `react-router-dom`. `useParams` is used to access URL parameters, and `useHistory` is used for programmatically navigating to different routes.
- **updateUrl**: This is a custom function imported from `../../lib/mapUrl`, which likely handles URL manipulation by updating specific parameters.
- **Tabs and Tab**: These are components from `@material-ui/core`, a popular React UI library. They are used to create a tabbed interface for the map picker.

### Component: MapPicker

The `MapPicker` component is structured as follows:

#### Hooks

- **useParams**: Retrieves the current route parameters. In this component, it is used to extract the `mode` parameter, which indicates the current map view mode (e.g., 'COVID-US' or 'COVID-COUNTY').
- **useHistory**: Provides history manipulation capabilities, allowing the component to navigate to a different route when the user selects a different tab.

#### Constants

- **axes**: An array of objects, where each object represents a different map view mode. Each object has:
  - `name`: The internal name used for the mode.
  - `display`: The display name shown in the UI.

#### Functions

- **handleChange**: A function that handles the event when a user selects a different tab. It takes two arguments:
  - `event`: The event object (not used in this function).
  - `newValue`: The new value selected by the user, corresponding to the map view mode.
  
  The function uses `history.push` in conjunction with `updateUrl` to navigate to the new URL reflecting the selected mode and an additional fixed parameter `'when': 'now'`.

- **a11yProps**: A utility function that returns accessibility properties for the tabs. It takes an `index` as an argument and returns an object with:
  - `id`: A unique identifier for the tab.
  - `aria-controls`: Indicates which tab panel is controlled by this tab.

#### JSX Structure

- The component returns a `div` with classes `map-map-picker` and `map-picker`.
- Inside the `div`, a `Tabs` component is rendered with the following properties:
  - `orientation="vertical"`: The tabs are displayed vertically.
  - `onChange={handleChange}`: The change event handler.
  - `aria-label`: Accessibility label for the group of tabs.
  - `value={mode}`: The current active tab is determined by the `mode` parameter from the URL.
  
- The `Tabs` component maps over the `axes` array to generate individual `Tab` components:
  - Each `Tab` is given a `key` for React's reconciliation process, `value` corresponding to the mode, and `label` for display.
  - The `...a11yProps(index)` spreads the accessibility properties onto each tab, ensuring it is accessible.

### Export

- The component is exported as the default export for use in other parts of the application.

### Summary

The `MapPicker` component provides a user interface for selecting different map views by utilizing tabs. It leverages React Router for navigation and Material-UI for UI components to ensure a consistent and accessible interface. Through the use of hooks, it dynamically updates the displayed content based on the current URL parameters.