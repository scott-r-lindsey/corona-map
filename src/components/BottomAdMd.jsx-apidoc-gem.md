# Documentation for `BottomAdMd.jsx`

## Overview
The `BottomAdMd.jsx` file defines a React functional component named `BottomAdMd`. This component is used to render a styled container for an advertisement or any other child content at the bottom of the page. It accepts properties that determine the height of the advertisement and the content to be displayed.

## Imports
- **React**: The primary library for building user interfaces in a declarative manner. The component uses React to create a functional component.
- **PropTypes**: A library used for runtime type checking of React component props. It helps to ensure that the component is used correctly by validating the types of the props passed to it.
- **exact**: A helper function from `prop-types-exact`, which is used to enforce that only the specified props are passed to the component, helping to catch any unexpected props.

## Component: `BottomAdMd`
### Description
The `BottomAdMd` component is a functional component that renders a div with a specific style and content. It is designed to be used for displaying an advertisement at the bottom of a medium-sized display area.

### Props
- **children (PropTypes.element.isRequired)**: This prop expects a single React element. It represents the content that will be displayed inside the advertisement container. It is marked as required, meaning that the component will not function correctly without it.
- **adHeight (PropTypes.number.isRequired)**: This prop expects a number representing the height of the advertisement container in pixels. It is also marked as required.

### Return Value
The component returns a JSX structure that consists of a div with the class `bottom-ad-md` containing another div with the class `bottom-ad`. The `bottom-ad` div is styled inline with the following properties:
- **color**: Set to `'white'`, ensuring that the text color within this div is white.
- **height**: Dynamically set based on the `adHeight` prop, allowing the height to be adjustable.
- **width**: Set to `'100%'`, making the advertisement container span the full width of its parent.

### Usage
The `BottomAdMd` component is used like any other React component. It should be placed within a parent component's render method, and the `adHeight` and `children` props must be provided. For example:

```jsx
<BottomAdMd adHeight={100}>
  <span>Advertisement Content Here</span>
</BottomAdMd>
```

This would render a bottom advertisement container that is 100 pixels high and contains the specified content.

## PropTypes
The component uses `PropTypes` for type checking:
- `exact` is used to ensure that only the specified props (`children` and `adHeight`) are passed to the component. If additional props are provided, a warning will be issued during development.
- `PropTypes.element.isRequired` for `children` ensures that a valid React element is always passed.
- `PropTypes.number.isRequired` for `adHeight` ensures that a number is provided for the height.

## Export
The `BottomAdMd` component is exported as the default export of the module, making it available for import in other parts of the application using:

```jsx
import BottomAdMd from './BottomAdMd';
```

This allows the component to be easily reused wherever a bottom advertisement is needed in the application.