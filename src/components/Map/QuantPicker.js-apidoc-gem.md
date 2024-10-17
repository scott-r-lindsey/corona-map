# QuantPicker Component Documentation

The `QuantPicker` component is a React functional component used to provide a user interface for selecting different map quantification modes on a web application. This component is part of the "corona-map" project, which is likely a visualization tool for COVID-19 related data.

## Imports

- **React**: The main library for building user interfaces in JavaScript. The component is built using React.
- **useParams, useHistory** (from `react-router-dom`): Hooks used for accessing route parameters and navigation control, respectively. These are essential for managing URL states and navigation in a single-page application.
- **updateUrl**: A custom function imported from `../../lib/mapUrl` that is presumably used to update the URL parameters based on user selections.
- **Tabs, Tab** (from `@material-ui/core`): Components from the Material-UI library that provide a tabbed interface, allowing users to select from multiple options.

## Component: QuantPicker

### State and Hooks

- **useParams**: Retrieves the current URL parameters. In this component, it extracts the `quant` parameter, which determines the currently selected quantification mode.
- **useHistory**: Provides access to the history instance, which allows navigation programmatically. This is used here to update the browser URL when the user selects a different quantification mode.

### Variables

- **params**: Holds the parameters from the URL, specifically used here to get the current `quant`.
- **history**: An instance that allows navigation and URL updates.
- **quant**: Destructured from `params`, represents the current quantification mode selected by the user.
- **quants**: An array of objects, each representing a quantification mode available for selection. Each object has:
  - `name`: A unique identifier used programmatically.
  - `display`: The text shown to the user.

### Functions

- **handleChange**: An event handler that is triggered when the user selects a different tab. It updates the URL using `history.push` and the `updateUrl` function, changing the `quant` parameter to the newly selected value (`newValue`).

- **a11yProps**: A utility function that returns accessibility properties for each tab. This function ensures that each tab has a unique `id` and `aria-controls`, which are important for screen readers and accessible navigation.

### Render Logic

- **Tabs Component**: 
  - **orientation**: Set to "vertical", indicating that tabs are displayed in a vertical list.
  - **onChange**: Attached to `handleChange`, this function triggers when a user selects a different tab.
  - **aria-label**: Provides an accessible label for the tab group, "Choose Map Quant".
  - **value**: Binds the current selected `quant` to the Tabs component, ensuring it reflects the current state.

- **Tab Component**:
  - Each tab is generated using `quants.map()`, which iterates over the `quants` array.
  - **key**: Uses `val.name` to uniquely identify each tab, which is crucial for React's rendering process.
  - **value**: Set to `val.name`, this is the value that gets passed to `handleChange`.
  - **label**: Displays `val.display`, which is the text shown to the user.
  - **a11yProps**: Applies accessibility properties to each tab.

### Return Value

The component returns a JSX structure that includes a `div` with the class names `map-quant-picker` and `map-picker`. Inside this div, a `Tabs` component is rendered with multiple `Tab` components representing the quantification modes.

## Export

The `QuantPicker` component is exported as the default export, making it available for use in other parts of the application.

## Additional Notes

- The `quants` array currently includes two quantification modes: "total" and "percap". There is a commented-out mode "change", which suggests it might be added in the future.
- The component assumes that `updateUrl` effectively manages the URL state, ensuring the application reflects the user's choices.
- The use of Material-UI components suggests a focus on consistent styling and accessibility, leveraging a popular UI framework.