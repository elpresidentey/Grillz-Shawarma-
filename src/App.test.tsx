import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app with Lagos Shawarma branding', () => {
  render(<App />);
  expect(screen.getAllByText(/Lagos Shawarma/i).length).toBeGreaterThan(0);
});

test('renders main navigation', () => {
  render(<App />);
  expect(screen.getAllByRole('link', { name: /menu/i }).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Order Now/i).length).toBeGreaterThan(0);
});
