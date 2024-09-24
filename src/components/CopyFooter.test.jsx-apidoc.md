# File Documentation: `CopyFooter.test.jsx`

This file contains a single test suite for the `CopyFooter` component. The purpose of this test is to ensure that the `CopyFooter` component renders correctly with the appropriate links and text. The test uses React Testing Library to render the component and to query the DOM for specific elements.

### Import Statements

```javascript
import React from 'react';
import { render, screen } from '@testing-library/react';
import CopyFooter from './CopyFooter';
```

- **React**: The library for building user interfaces. It is imported to allow JSX syntax and to enable the rendering of the `CopyFooter` component.
- **render**: A function from the Testing Library that renders a React component into a container and returns a collection of utilities for querying the DOM.
- **screen**: An object from the Testing Library that provides queries to find elements in the rendered component.
- **CopyFooter**: The component being tested, imported from the relative path `'./CopyFooter'`.

### Test Suite

```javascript
test('renders CopyFooter with correct links and text', () => {
  render(<CopyFooter />);
  
  // Check for Privacy Policy link
  const privacyLink = screen.getByText(/Privacy Policy/i);
  expect(privacyLink).toBeInTheDocument();
  expect(privacyLink).toHaveAttribute('href', '/blog/privacy-policy/');
  
  // Check for Terms of Service link
  const termsLink = screen.getByText(/Terms of Service/i);
  expect(termsLink).toBeInTheDocument();
  expect(termsLink).toHaveAttribute('href', '/blog/terms-of-service/');
  
  // Check for copyright text
  const copyrightText = screen.getByText(/Copyright/i);
  expect(copyrightText).toBeInTheDocument();
  expect(copyrightText).toHaveTextContent('Copyright © Scott Lindsey');
});
```

#### Test Function: `test`

The `test` function defines a single test case. It takes two arguments:

1. **Description**: A string that describes what the test is checking for. In this case, it is `'renders CopyFooter with correct links and text'`.
2. **Callback Function**: A function that contains the actual test logic.

#### Test Steps

1. **Render the Component**

   ```javascript
   render(<CopyFooter />);
   ```

   The `render` function is called with the `CopyFooter` component to render it into the DOM. This allows us to perform queries on the rendered component.

2. **Check for Privacy Policy Link**

   ```javascript
   const privacyLink = screen.getByText(/Privacy Policy/i);
   expect(privacyLink).toBeInTheDocument();
   expect(privacyLink).toHaveAttribute('href', '/blog/privacy-policy/');
   ```

   - **Query**: `screen.getByText(/Privacy Policy/i)` searches for an element containing the text "Privacy Policy", ignoring case (`/i`).
   - **Assertion 1**: `expect(privacyLink).toBeInTheDocument();` checks that the element is present in the document.
   - **Assertion 2**: `expect(privacyLink).toHaveAttribute('href', '/blog/privacy-policy/');` checks that the element has an `href` attribute with the value `'/blog/privacy-policy/'`.

3. **Check for Terms of Service Link**

   ```javascript
   const termsLink = screen.getByText(/Terms of Service/i);
   expect(termsLink).toBeInTheDocument();
   expect(termsLink).toHaveAttribute('href', '/blog/terms-of-service/');
   ```

   - **Query**: `screen.getByText(/Terms of Service/i)` searches for an element containing the text "Terms of Service", ignoring case.
   - **Assertion 1**: `expect(termsLink).toBeInTheDocument();` checks that the element is present in the document.
   - **Assertion 2**: `expect(termsLink).toHaveAttribute('href', '/blog/terms-of-service/');` checks that the element has an `href` attribute with the value `'/blog/terms-of-service/'`.

4. **Check for Copyright Text**

   ```javascript
   const copyrightText = screen.getByText(/Copyright/i);
   expect(copyrightText).toBeInTheDocument();
   expect(copyrightText).toHaveTextContent('Copyright © Scott Lindsey');
   ```

   - **Query**: `screen.getByText(/Copyright/i)` searches for an element containing the text "Copyright", ignoring case.
   - **Assertion 1**: `expect(copyrightText).toBeInTheDocument();` checks that the element is present in the document.
   - **Assertion 2**: `expect(copyrightText).toHaveTextContent('Copyright © Scott Lindsey');` checks that the element contains the exact text `'Copyright © Scott Lindsey'`.

### Summary

This test ensures that the `CopyFooter` component renders correctly with:
1. A "Privacy Policy" link pointing to `'/blog/privacy-policy/'`.
2. A "Terms of Service" link pointing to `'/blog/terms-of-service/'`.
3. The expected copyright text including "Scott Lindsey".

By using the React Testing Library, the test interacts with the component in a way that closely resembles how users interact with it, providing confidence that the component behaves as expected in a real-world scenario.