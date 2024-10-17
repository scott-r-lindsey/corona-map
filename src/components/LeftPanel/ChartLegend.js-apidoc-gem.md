# ChartLegend.js Documentation

## Overview

This file defines a React functional component named `ChartLegend`. The component is used to render a legend for a chart, which includes labels for minimum and maximum values as well as color-coded indicators for different data categories such as "Confirmed", "Deaths", and "Exponent".

## Imports

- **React**: The primary library for building user interfaces in a declarative manner. The component `ChartLegend` is a functional component built using React.

- **PropTypes**: A library for type-checking props passed to React components, ensuring they adhere to the expected types.

- **exact**: A utility from `prop-types-exact` that allows prop types to be strictly validated, ensuring no additional props are passed to the component than those specified.

- **Color Imports**: The colors used in the legend (`confirmedColor`, `deathColor`, `logColor`) are imported from a local module, `../../lib/colors.js`. These colors are used to visually distinguish between different data categories in the chart legend.

## Component: ChartLegend

### Description

The `ChartLegend` component is responsible for rendering a visual legend that accompanies a chart. It displays minimum and maximum values and includes color-coded indicators for different types of data: "Confirmed", "Deaths", and "Exponent".

### Props

- `min` (string): A required prop that represents the minimum value to be displayed in the legend. It is expected to be a string.
  
- `max` (string): A required prop that represents the maximum value to be displayed in the legend. It is expected to be a string.

### Functionality

1. **Destructuring Props**: The component begins by destructuring the `min` and `max` values from the `props` object. This allows for easy access to these values within the component.

2. **Rendering**: The component returns a JSX structure that represents the legend:
   - A `div` with the class `chart-legend` serves as the container for the legend.
   - Two `div` elements with classes `tick-label min` and `tick-label max` display the `min` and `max` values, respectively.
   - A `div` with the class `middle` contains the legend entries:
     - Each entry consists of a `div` with the class `dot`, styled with a specific background color from the imported colors, followed by a text label ("Confirmed", "Deaths", "Exponent").

### Styling

- Each "dot" represents a color indicator for a specific data category. The background colors for these dots are defined by the imported constants (`confirmedColor`, `deathColor`, `logColor`), which correspond to the chart's data categories.

## PropTypes Validation

The `ChartLegend` component uses `exact` from `prop-types-exact` in combination with `PropTypes` to validate its props. This ensures that:

- `min` and `max` are both strings and are required.
- No additional props are passed to the component, adhering to the exact specification of the props.

## Export

The component is exported as the default export of the module, allowing it to be imported and used in other parts of the application.

## Summary

The `ChartLegend` component is a simple, yet essential part of the user interface that provides contextual information for a chart. By using color indicators and displaying range values, it enhances the user's ability to interpret the data presented in the chart. The strict prop validation ensures that the component is used correctly throughout the application.