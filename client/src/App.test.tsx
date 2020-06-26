/**
 * Test File
 */

import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders welcome heading', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Welcome/i);
  expect(linkElement).toBeInTheDocument();
});
