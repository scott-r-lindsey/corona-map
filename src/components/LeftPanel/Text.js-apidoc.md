# Text.js Documentation

## Overview
`Text.js` is a React component that renders a block of informative text related to COVID-19 statistics and safety precautions. It includes textual content with links to external resources, providing users with detailed information about the data and guidelines for staying safe during the pandemic. The component uses React and React Router for navigation.

## Import Statements
```javascript
import React from "react";
import { Link } from "react-router-dom";
```
- **React**: The main library for building user interfaces.
- **Link**: A component from `react-router-dom` used for creating navigable links within the application.

## Functional Component: Text
The `Text` component is defined as a functional component using an arrow function.

### Component Definition
```javascript
const Text = () => {
```
- **Text**: This is the name of the functional component. It uses an arrow function syntax and does not accept any props.

### JSX Return
The component returns a JSX block that defines the structure and content of the rendered HTML.

```javascript
return (
  <div className="text-block">
```
- **div.text-block**: A container `<div>` element with a class name `text-block` that wraps all the content. This class can be used for styling purposes.

### Paragraph Elements
The component contains multiple `<p>` elements, each providing specific information:

1. **First Paragraph**
    ```javascript
    <p>
      Chart is presented in Lograthimic (10, 100, 1000...) format to best show "the curve" and our efforts to bend that curve downward by limiting the exponential increase in new cases.
    </p>
    ```
    - Explains the logarithmic format of the chart and its purpose in visualizing efforts to reduce the exponential growth of COVID-19 cases.

2. **Second Paragraph**
    ```javascript
    <p>
      The 1x, 2x and 3x lines reprensent a hypothetical increase rate of doubling every day, every two days, or every three days respectively.
    </p>
    ```
    - Describes the meaning of the 1x, 2x, and 3x lines on the chart, indicating different rates of case doubling.

3. **Third Paragraph**
    ```javascript
    <p>
      Data is sourced from <a href="https://systems.jhu.edu/research/public-health/ncov/">John Hopkins CSSE</a> and is updated each day.
    </p>
    ```
    - Provides the source of the data, which is John Hopkins CSSE, and mentions that the data is updated daily. The source is hyperlinked to the relevant page.

4. **Fourth Paragraph**
    ```javascript
    <p>
      This page is fully bookmarkable -- you can select a particular state and/or axis and share that data directly, or return to the <Link to="/COVID-US/now/deaths/united%20states">United States</Link> at any time.
    </p>
    ```
    - Informs users that the page is bookmarkable, allowing them to share specific data or return to a default view. It also includes a navigable link back to the United States data page using the `Link` component from `react-router-dom`.

5. **Fifth Paragraph**
    ```javascript
    <p>
      Take appropriate precautions including wearing a mask while outside, social distancing, frequent hand washing and more: There is good and more specific advice available <a href="https://www.who.int/emergencies/diseases/novel-coronavirus-2019/advice-for-public">from the WHO</a> and <a href="https://www.cdc.gov/coronavirus/2019-ncov/prevent-getting-sick/prevention.html">from the CDC</a>.
    </p>
    ```
    - Advises users to follow safety precautions such as wearing masks, social distancing, and hand washing. It provides links to detailed guidelines from the WHO and CDC.

6. **Sixth Paragraph**
    ```javascript
    <p>
      COVID-VIR.US is created and operated by Scott Lindsey (<a href="/blog/2020/04/12/about/">About</a>).
    </p>
    ```
    - Credits the creator of the site, Scott Lindsey, and includes a link to an About page for more information about him.

### Component Export
```javascript
export default Text;
```
- **export default**: This statement exports the `Text` component as the default export of the module, making it available for import in other parts of the application.

## Summary
The `Text.js` file defines a `Text` component that provides users with important information about COVID-19 data visualization and safety guidelines. It uses React for building the component and React Router for internal navigation links. The component is structured with multiple paragraphs, each containing specific pieces of information and external links to relevant resources.