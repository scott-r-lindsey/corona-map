
import React from 'react';
import { render, screen } from '@testing-library/react';
import CopyFooter from './CopyFooter';

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
