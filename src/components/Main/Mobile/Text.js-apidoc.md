# Detailed Documentation for `Text.js`

## Overview
This file, `Text.js`, is a React component that renders informational text about COVID-19, including data sources, precautionary measures, and a reference to the creator. It also includes a footer component. The file uses JSX syntax, React hooks, and external links.

## Imports
```javascript
import React from "react";
import { Link } from "react-router-dom";
import CopyFooter from '../../CopyFooter';
```
1. **React**: The main library used to build the component.
2. **Link**: A component from `react-router-dom` used for client-side navigation.
3. **CopyFooter**: A custom footer component imported from a relative path.

## Component Definition
### `Text` Component
The `Text` component is a functional component that returns a JSX fragment. It contains a `div` with several paragraphs of text and a footer component.

```javascript
const Text = () => {
  return (
    <>
      <div className="text-block">
        <p>
          Data is sourced from <a href="https://systems.jhu.edu/research/public-health/ncov/">John Hopkins CSSE</a> and is updated each day.
        </p>
        <p>
          This page is fully bookmarkable -- you can select a particular state and/or axis and share that data directly, or return to the <Link to="/COVID-US/now/deaths/united%20states">United States</Link> at any time.
        </p>
        <p>
          Take appropriate precautions including wearing a mask while outside, social distancing, frequent hand washing and more: There is good and more specific advice available <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">from the WHO</a> and <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">from the CDC</a>.
        </p>
        <p>
          COVID-VIR.US is created and operated by Scott Lindsey (<a href="/blog/2020/04/12/about/">About</a>).
        </p>
      </div>
      <CopyFooter />
    </>
  );
}
```

#### Explanation:
1. **Fragment (`<> ... </>`)**: Used to group multiple elements without adding extra nodes to the DOM.
2. **`div` with class "text-block"**: Contains several paragraphs (`<p>`) with informational text and hyperlinks.
3. **Hyperlinks (`<a>` tags)**: These links direct users to external resources such as John Hopkins CSSE, WHO, and CDC for updated information and precautionary measures.
4. **React Router `Link`**: Used for internal navigation within the application, directing users to a specific route ("/COVID-US/now/deaths/united%20states").
5. **`CopyFooter` Component**: Renders a footer at the bottom of the text block.

## Export
```javascript
export default Text;
```
- This statement exports the `Text` component as the default export, making it available for import in other files.

## Summary
- The `Text` component is a functional React component that displays static information about COVID-19.
- It leverages external links for authoritative sources and internal links for navigating within the application.
- The component includes a custom footer component, `CopyFooter`, to maintain consistency across the site's layout.
- This file is structured to ensure that the information is easily accessible and up-to-date, providing users with reliable resources for COVID-19 data and safety guidelines.