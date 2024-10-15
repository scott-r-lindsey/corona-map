**Text.js Documentation**

**Overview**
------------

The `Text` component is a functional React component that displays information about the COVID-19 map chart.

**Imports**
------------

The `Text` component imports two external libraries:

*   `React`: The main library for building user interfaces in JavaScript.
*   `Link`: A component from `react-router-dom` used to create links between routes in a web application.

**Component Definition**
----------------------

### `const Text = () => { ... }`

The `Text` component is defined as an anonymous function that returns JSX elements. This function represents the main content of the component.

**JSX Elements**
----------------

The following JSX elements are rendered by the `Text` component:

*   `<div className="text-block">`: The outermost container element with a class name of "text-block".
*   `<p> ... </p>`: Multiple paragraph elements that contain text information about the chart.
	+   Each paragraph contains relevant information such as the format used to display data, explanations for certain lines on the chart, sources of data, and advice for users.

**Links**
---------

The following links are embedded in the component:

*   `<Link to="/COVID-US/now/deaths/united states">`: A link that takes the user back to the main page when clicked.
*   `<a href="https://systems.jhu.edu/research/public-health/ncov/">` and `<a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">` and `<a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">`: Links to external websites with additional information about COVID-19.

**Export**
----------

The `Text` component is exported as the default export of the file, allowing it to be imported and used in other parts of the application.

```javascript
export default Text;
```

**Key Logic**
-------------

No complex logic is present in this file. The main purpose of the `Text` component is to display information about the COVID-19 map chart in a readable format.