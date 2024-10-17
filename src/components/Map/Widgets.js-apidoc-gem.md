# Detailed Documentation for Widgets.js

## Overview

The `Widgets.js` file is a React component that serves as a container for various widget components used in the application. These widgets are designed to interact with a map feature, likely to display data related to the coronavirus on a map interface. This component integrates several functionalities such as searching data, adjusting scales, and selecting map attributes.

## Imports

- **React**: The primary library used for building the component-based User Interface.
- **Scale**: A component for handling the scale of the map, likely adjusting how data is visualized based on scale.
- **QuantPicker**: A component for selecting quantitative data options, possibly to filter or categorize data.
- **AxisPicker**: A component for selecting axis options, which might adjust how data is presented on the map (e.g., X-axis, Y-axis).
- **MapPicker**: A component for selecting different map views or types.
- **zeroColor**: A constant or function imported from a colors utility file, which might denote a default color used when data values are zero.
- **Search**: A component that allows users to search through the data.
- **PropTypes**: A library for runtime type checking of React component props.
- **exact**: A utility from `prop-types-exact` to specify that the component should only receive exactly the defined props, and no more.

## The `Widgets` Component

### Component Definition

```javascript
const Widgets = (props) => {
  const {data, max, colorScale} = props;

  return (
    <>
      <Search data={data} />
      <div className={"map-widget-shell"}>
        <div style={{float:'left', display:'inline-block'}}>
          <Scale {...{max, zeroColor, colorScale}} />
          <div style={{display:'inline-block'}}>
            <QuantPicker />
            <AxisPicker />
            <MapPicker />
          </div>
        </div>
      </div>
    </>
  );
}
```

### Description

- **Function Signature**: `Widgets` is a functional component that receives `props` as its argument.
- **Destructuring Props**: The component destructures three properties from the `props` object:
  - `data`: An object containing the data to be visualized.
  - `max`: A number representing the maximum value for scaling purposes.
  - `colorScale`: A function that likely determines how colors are mapped to data values.
- **Return Statement**: The component returns a JSX fragment consisting of several child components:
  - **`<Search />`**: Uses the `data` prop to enable users to search through the dataset.
  - **`<div className={"map-widget-shell"}>`**: Wraps the widgets in a styled container.
    - **Float and Display Styles**: The `div` uses inline styles to align its children horizontally.
    - **`<Scale />`**: Receives `max`, `zeroColor`, and `colorScale` props to manage visual scaling.
    - **`<QuantPicker />`, `<AxisPicker />`, `<MapPicker />`**: These components are displayed inline and serve as tools for data and map manipulation.

### PropTypes

```javascript
Widgets.propTypes = exact({
  max: PropTypes.number.isRequired,
  colorScale: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
});
```

- **`max`**: Required and must be a number. It defines the upper bound for scaling.
- **`colorScale`**: Required and must be a function. It handles color assignment for data values.
- **`data`**: Required and must be an object. This is the dataset passed for visualization and interaction.

## Export

```javascript
export default Widgets;
```

- The `Widgets` component is exported as the default export of the module, making it available for import in other parts of the application.

## Summary

`Widgets.js` acts as a container for several interactive components related to map visualization. It allows users to search data, adjust the scale and appearance of the map, and choose various map options. The careful structure with `PropTypes` ensures that the component is robust against improper usage by strictly defining the required props and their types.