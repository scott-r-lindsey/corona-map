Certainly! Below is a detailed documentation of the `Tooltip.js` file, explaining its functionality, key components, and logic:

---

## File: Tooltip.js

### Overview
This file defines a React functional component named `MapTooltip` that is used to display a tooltip on a map interface. The tooltip provides detailed information about a specific geographical location's COVID-19 data when a user interacts with the map.

### Imports
- **React**: The core library for building user interfaces with components.
- **capitalizeLocation**: A helper function imported from `../../lib/getMapValue` that capitalizes the location name.
- **moment**: A library for parsing, validating, manipulating, and formatting dates.
- **PropTypes**: A library for type-checking React props.
- **exact**: A utility from `prop-types-exact` to ensure that the props passed to a component match exactly the specified prop types.

### Component: MapTooltip

#### Props
- **left**: A number representing the horizontal position (in pixels) of the tooltip on the screen.
- **top**: A number representing the vertical position (in pixels) of the tooltip on the screen.
- **show**: A boolean indicating whether the tooltip should be visible or hidden.
- **data**: An object containing the data to be displayed in the tooltip. This includes location, axis data (confirmed cases and deaths), population, and date.

#### Internal Functions
- **roundFour**: A helper function that takes a number (`val`) and truncates it to three decimal places. It multiplies the number by 1000, truncates the result, and divides it by 1000 to achieve the desired precision.

#### Logic and Structure
- The tooltip's style is defined inline, using an absolute position based on the `left` and `top` props. The `top` value is adjusted by subtracting 15 pixels to ensure the tooltip is positioned correctly relative to the cursor or data point.
- The `display` property of the style is set to `'block'` if `show` is `true`, making the tooltip visible. Otherwise, it is set to `'none'`, hiding the tooltip.
- The tooltip is rendered only if `data.location` is truthy, which indicates that there is valid data to display.
- The content of the tooltip includes:
  - The location name, capitalized using the `capitalizeLocation` function.
  - A table displaying:
    - Total confirmed cases and deaths, formatted with commas for readability.
    - Cases and deaths per 1000 people, calculated using the `roundFour` function to ensure precision.
    - The population of the location, also formatted with commas.
  - A date indicating the last update of the data, formatted using `moment` to display a human-readable date (e.g., "March 10th").
- The tooltip's HTML structure includes nested `div` elements with specific classes for styling purposes, such as `map-tooltip`, `map-tooltip-anchor`, and `map-tooltip-inner`.

#### PropTypes Validation
- The `MapTooltip` component uses `PropTypes` to enforce the types of its props:
  - `data`: An object that is required.
  - `left`: A number that is required.
  - `top`: A number that is required.
  - `show`: A boolean that is required.
- The `exact` utility is used to ensure that no additional props are passed to the component beyond those explicitly defined.

### Export
- The `MapTooltip` component is exported as the default export of the module, making it available for use in other parts of the application.

---

This documentation provides a comprehensive explanation of the `Tooltip.js` file, detailing the purpose and functionality of the `MapTooltip` component, as well as the logic behind its implementation.