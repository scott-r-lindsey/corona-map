# Documentation for `CopyFooter.test.jsx`

## Overview

The `CopyFooter.test.jsx` file contains a unit test for the `CopyFooter` component using the React Testing Library. The purpose of this test is to ensure that the `CopyFooter` component renders correctly and includes specific elements such as links and text. This documentation explains each part of the test file, including the imports, the test logic, and the expected behavior.

## File Contents

### Imports

```jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import CopyFooter from './CopyFooter';
```

- **React**: This import is necessary as we're working with JSX. It ensures that JSX syntax is correctly transformed into JavaScript calls.
  
- **render, screen**: These are utilities from the `@testing-library/react` library.
  - `render`: This function is used to render React components into a virtual DOM for testing purposes.
  - `screen`: This utility provides a set of queries to access the rendered DOM.

- **CopyFooter**: This is the component under test. It is imported from the local file `CopyFooter.jsx` located in the same directory.

### Test Case

```jsx
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

#### Test Description

- **Test Name**: `'renders CopyFooter with correct links and text'`
  - This test is designed to verify that the `CopyFooter` component contains the correct links and text as expected.

#### Test Logic

1. **Render the Component**: 
   - `render(<CopyFooter />);`
   - The `CopyFooter` component is rendered into the virtual DOM, making it possible to query and test its contents.

2. **Check for Privacy Policy link**:
   - `const privacyLink = screen.getByText(/Privacy Policy/i);`
     - This line queries the DOM for an element containing the text "Privacy Policy", ignoring case sensitivity due to the `/i` flag in the regex.
   - `expect(privacyLink).toBeInTheDocument();`
     - Asserts that the Privacy Policy link is present in the rendered component.
   - `expect(privacyLink).toHaveAttribute('href', '/blog/privacy-policy/');`
     - Asserts that the link has the correct `href` attribute pointing to `/blog/privacy-policy/`.

3. **Check for Terms of Service link**:
   - `const termsLink = screen.getByText(/Terms of Service/i);`
     - Queries the DOM for an element containing the text "Terms of Service".
   - `expect(termsLink).toBeInTheDocument();`
     - Asserts that the Terms of Service link is present in the rendered component.
   - `expect(termsLink).toHaveAttribute('href', '/blog/terms-of-service/');`
     - Asserts that the link has the correct `href` attribute pointing to `/blog/terms-of-service/`.

4. **Check for copyright text**:
   - `const copyrightText = screen.getByText(/Copyright/i);`
     - Queries the DOM for an element containing the text "Copyright".
   - `expect(copyrightText).toBeInTheDocument();`
     - Asserts that the copyright text is present in the rendered component.
   - `expect(copyrightText).toHaveTextContent('Copyright © Scott Lindsey');`
     - Asserts that the text content matches the expected copyright statement.

## Summary

This test ensures that the `CopyFooter` component contains the required elements, such as links to the Privacy Policy and Terms of Service, as well as the correct copyright text. By using `@testing-library/react`, the test interacts with the component as a user would, verifying the presence and correctness of these elements in a way that resembles real-world usage.