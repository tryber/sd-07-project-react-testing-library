import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('if page contains an h2 heading with the text Page requested not found 😭', () => {
  renderWithRouter(<NotFound />);
  const textNotFound = screen.getByText(/Page requested not found/i);
  expect(textNotFound).toBeInTheDocument();
});

test('if page shows the image https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  renderWithRouter(<NotFound />);
  const image = screen.getByAltText(/Pikachu crying/i);
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
