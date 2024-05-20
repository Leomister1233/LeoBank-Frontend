import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login page by default', () => {
  render(
      <App />
  );

  // Assert that the Login component is rendered by default
  const loginElements = screen.getAllByText(/Login/i);
  expect(loginElements.length).toBeGreaterThan(0);
});