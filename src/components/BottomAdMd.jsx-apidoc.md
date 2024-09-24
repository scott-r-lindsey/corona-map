# Detailed Documentation for BottomAdMd.jsx

## Overview
The `BottomAdMd.jsx` file defines a React functional component named `BottomAdMd`. This component is designed to display an advertisement section at the bottom of a webpage, with a specified height and child elements. The component ensures that the required properties are provided using PropTypes for type checking.

## Components and Functions

### Import Statements
```javascript
import React from 'react';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
```
- `React`: The primary library for building user interfaces in React.
- `PropTypes`: A library for type-checking props in React components.
- `exact`: A utility from `prop-types-exact` to ensure that only the specified prop types are passed and no extra props are allowed.

### BottomAdMd Component
```javascript
const BottomAdMd = (props) => {
  const { adHeight, children } = props;

  return (
    <div className="bottom-ad-md">
      <div
        className="bottom-ad"
        style={{ color: 'white', height: `${adHeight}px`, width: '100%' }}
      >
        { children }
      </div>
    </div>
  );
};
```

#### Description
- **`BottomAdMd`**: A functional component that renders an advertisement section.
- **Parameters**: 
  - `props`: An object containing the properties passed to the component.
  - **Destructured Props**:
    - `adHeight` (number): The height of the advertisement section in pixels.
    - `children` (element): The child elements to be displayed within the advertisement section.

#### Return Value
The component returns a JSX structure:
- A `div` with the class `bottom-ad-md` which wraps another `div` with the class `bottom-ad`.
- The inner `div` has inline styles applied to set the `color` to white, `height` to the value of `adHeight` prop in pixels, and `width` to 100%.
- The `children` prop is rendered inside the inner `div`.

### Export Statement
```javascript
export default BottomAdMd;
```
- The `BottomAdMd` component is exported as the default export of the module, making it available for import in other files.

### PropTypes Definition
```javascript
BottomAdMd.propTypes = exact({
  children: PropTypes.element.isRequired,
  adHeight: PropTypes.number.isRequired,
});
```

#### Description
- **`BottomAdMd.propTypes`**: Specifies the prop types for the `BottomAdMd` component.
- **Props**:
  - `children`: 
    - Type: `PropTypes.element`
    - Required: Yes
    - Description: The child elements to be displayed within the advertisement section.
  - `adHeight`:
    - Type: `PropTypes.number`
    - Required: Yes
    - Description: The height of the advertisement section in pixels.

#### `exact` Utility
- The `exact` utility from `prop-types-exact` ensures that only the specified props (`children` and `adHeight`) are passed to the component. If any additional props are provided, it will result in a warning.

## Summary
The `BottomAdMd.jsx` file defines a React functional component that renders a customizable advertisement section at the bottom of a webpage. The component uses PropTypes for type checking to ensure that the required properties (`children` and `adHeight`) are provided and correctly typed.