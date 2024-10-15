**Logo.jsx**
================

### Overview

The `Logo` component is a React functional component that renders the logo of the COVID-VIR.US website.

### Imports

The component imports the following modules:

*   `React`: The main library for building user interfaces.
*   `Link` from `react-router-dom`: A component used to create links between routes in a web application.
*   `home` from `../lib/config`: An object containing configuration settings, including the home route.

### Logo Component

The `Logo` component is defined as a functional component using the arrow function syntax. It returns a JSX element that represents the logo.

```jsx
const Logo = () => (
  <div className="logo">
    <Link to={home} className="logo">
      <img src="/img/covid-19-100.png" alt="corona-virus" />
      <span className="logo-text">
          COVID-VIR.US
      </span>
    </Link>
  </div>
);
```

### Explanation

The logo component consists of the following elements:

*   `div` with class `logo`: The outermost element that wraps the entire logo.
*   `Link` with props:
    *   `to={home}`: Specifies the route to which this link should navigate when clicked. In this case, it navigates to the home page of the website (`/home`).
    *   `className="logo"`: Applies CSS styles to the link element.
*   `img` with src `/img/covid-19-100.png`: The image that represents the logo.
*   `span` with class `logo-text`: The text that appears alongside the logo.

### Key Logic

The key logic in this component is the use of the `Link` component to create a link between routes. This allows users to navigate to different pages within the website by clicking on the logo.

### Export

Finally, the `Logo` component is exported as the default export of the module, making it available for import and use in other parts of the application.

```jsx
export default Logo;
```

### Notes

*   The image source (`/img/covid-19-100.png`) and alt text (`corona-virus`) can be modified to customize the appearance of the logo.
*   The CSS classes applied to the elements (e.g., `logo`, `logo-text`) can be updated to style the logo accordingly.