**Text.js**
================

### Overview

This JavaScript file defines a React component named `Text` that displays informative text about the COVID-19 data visualization application.

### Import Statements

The following import statements are used to bring in necessary dependencies:

```javascript
import React from "react";
import { Link } from "react-router-dom";
import CopyFooter from '../../CopyFooter';
```

*   `React`: The main library for building user interfaces in JavaScript.
*   `Link`: A component provided by `react-router-dom` that enables client-side routing in React applications.
*   `CopyFooter`: Another React component imported from a separate file.

### Text Component

The `Text` component is a functional component defined as follows:

```javascript
const Text = () => {
  return (
    // JSX code for the text content
  );
}
```

This component returns JSX, which is a syntax extension for JavaScript that allows you to write HTML-like code in your JavaScript files.

### JSX Code

The JSX code returned by the `Text` component consists of several paragraphs of text with links to external resources. The structure can be explained as follows:

```javascript
<>
  <div className="text-block">
    // paragraph 1
    <p>
      Data is sourced from <a href="https://systems.jhu.edu/research/public-health/ncov/">John Hopkins CSSE</a> and is updated each day.
    </p>

    // paragraph 2
    <p>
      This page is fully bookmarkable -- you can select a particular state and/or axis and share that data directly, or return to the <Link to="/COVID-US/now/deaths/united%20states">United States</Link> at any time.
    </p>

    // paragraph 3
    <p>
      Take appropriate precautions including wearing a mask while outside, social distancing, frequent hand washing and more: There is good and more specific advice available <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">from the WHO</a> and <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">from the CDC</a>.
    </p>

    // paragraph 4
    <p>
      COVID-VIR.US is created and operated by Scott Lindsey (<a href="/blog/2020/04/12/about/">About</a>).
    </p>
  </div>
  <CopyFooter />
</>
```

*   The `<>` tags denoted the beginning and end of the JSX code block.
*   Inside this block, a `div` element with the class name "text-block" is created.
*   Four paragraphs of text are generated using HTML-like syntax (`<p>`) within this div.
*   Each paragraph contains links to external resources (e.g., [John Hopkins CSSE](https://systems.jhu.edu/research/public-health/ncov/)) using `<a>` tags.

### Link Component Usage

The `Link` component is used twice in the JSX code:

```javascript
<p>
  This page is fully bookmarkable -- you can select a particular state and/or axis and share that data directly, or return to the <Link to="/COVID-US/now/deaths/united%20states">United States</Link> at any time.
</p>

<p>
  Take appropriate precautions including wearing a mask while outside, social distancing, frequent hand washing and more: There is good and more specific advice available <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">from the WHO</a> and <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">from the CDC</a>.
</p>
```

*   The `Link` component is used once to create a link to a specific route in the React Router DOM application.
*   In the second instance, it's not used explicitly. However, its usage can be inferred since the author is providing advice links from external organizations.

### Export Statement

Finally, the `Text` component is exported as the default export of this file:

```javascript
export default Text;
```

This makes the `Text` component available for import in other parts of the application.