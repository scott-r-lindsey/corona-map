# File Documentation: `ChartFloat.js`

The `ChartFloat.js` file is a React component that is designed to display floating chart data for a specific point in a time series. It is used to present summarized data, such as confirmed cases and deaths, for a particular time point, formatted in a user-friendly manner. This component is likely used in a data visualization application, possibly related to tracking COVID-19 metrics, given the context of "corona-map."

## Imports

- **React**: The primary library for building user interfaces with components. The component is a functional component.
- **moment**: A library for parsing, validating, and displaying dates in JavaScript. It is used here to format the date associated with the data point.
- **PropTypes**: A library for type-checking React props to ensure components are used correctly.
- **exact**: A helper from `prop-types-exact` that ensures only the specified props are passed to the component, providing stricter validation.

## Component: `ChartFloat`

### Description

`ChartFloat` is a functional React component that takes in `props` and conditionally renders a floating informational box based on the presence of a `point` object. This box contains the date, confirmed cases, and death counts for a specific time point.

### Props

- **data**: An object containing series data. This is a required prop and is expected to have structured time series data, specifically `confirmed` and `deaths` arrays.
- **point**: An object representing a specific data point. This may contain details such as the time of the data point and its position in the series arrays.

### Render Logic

- The component uses a conditional rendering approach. If a `point` is provided, the component renders a floating box with relevant data; otherwise, it renders nothing (returns `null`).
- The floating box (`<div className="chart-float">`) contains:
  - A formatted date using `moment`: The date is extracted from `point.data.time` and formatted to "Month Day" (e.g., "March 1st").
  - A table displaying:
    - **Confirmed cases**: The number of confirmed cases at the given data point position, formatted with thousands separators using `toLocaleString()`.
    - **Deaths**: The number of deaths at the given data point position, also formatted with `toLocaleString()`.

### Styling Considerations

- The component uses CSS classes (`confirmed`, `deaths`) for styling the table data cells. It also uses a class `chart-float` for the container, which should be defined in the application's stylesheets to control the appearance of the floating box.

### PropTypes

- **`data`**: The `data` prop is required and should be an object. This object should include `series` which further includes `confirmed` and `deaths` arrays.
- **`point`**: The `point` prop is optional. If provided, it should be an object that includes `data.time` (a timestamp) and `data.pos` (an index position).

### Export

- The component is exported as the default export of the module, allowing it to be imported and used in other parts of the application.

This component is part of a larger application, possibly related to COVID-19 data visualization, where it serves as a tool for providing detailed information on hover or click events over chart points.