**Widgets.js Documentation**
=====================================

**Overview**
------------

The `Widgets` component is a reusable React component that displays various widgets on a map, including a scale, quant picker, axis picker, and map picker.

**Imports**
------------

The following modules are imported:

* `React`: The main library for building user interfaces.
* `Scale`, `QuantPicker`, `AxisPicker`, and `MapPicker`: Custom components that represent the individual widgets on the map.
* `zeroColor` from `../../lib/colors`: A color constant used in the scale component.
* `Search`: A custom component that represents the search functionality on the map.
* `PropTypes`: The official React prop types library for validating props.
* `exact`: A utility function from `prop-types-exact` to validate props with exact matching.

**Widgets Component**
---------------------

The `Widgets` component is a functional component that takes in three props:

* `data`: An object containing data required for the map.
* `max`: The maximum value of the scale component.
* `colorScale`: A function that returns a color based on a given value.

```javascript
const Widgets = (props) => {
  const { data, max, colorScale } = props;

  return (
    // JSX representation of the component
  );
};
```

**JSX Representation**
--------------------

The `Widgets` component returns a JSX fragment containing:

* A `Search` component that takes in the `data` prop.
* A `div` element with a class name `"map-widget-shell"` containing:
	+ A `Scale` component that takes in the `max`, `zeroColor`, and `colorScale` props.
	+ A `div` element containing three child components: `QuantPicker`, `AxisPicker`, and `MapPicker`.

```javascript
return (
  <>
    <Search data={data} />
    <div className={"map-widget-shell"}>
      <div style={{ float: 'left', display: 'inline-block' }}>
        <Scale {...{ max, zeroColor, colorScale }} />
        <div style={{ display: 'inline-block' }}>
          <QuantPicker />
          <AxisPicker />
          <MapPicker />
        </div>
      </div>
    </div>
  </>
);
```

**PropTypes Validation**
-------------------------

The `Widgets` component uses the `exact` function from `prop-types-exact` to validate the props with exact matching. The validated prop types are:

* `max`: A number that is required.
* `colorScale`: A function that is required.
* `data`: An object that is required.

```javascript
export default Widgets;

Widgets.propTypes = exact({
  max: PropTypes.number.isRequired,
  colorScale: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired;
});
```

**Usage**
---------

To use the `Widgets` component, simply import it and pass in the required props:

```javascript
import React from 'react';
import Widgets from './Widgets';

const App = () => {
  const data = { /* some data */ };
  const max = 10;
  const colorScale = (value) => `rgb(${value}, 0, 0)`;

  return (
    <div>
      <Widgets data={data} max={max} colorScale={colorScale} />
    </div>
  );
};
```