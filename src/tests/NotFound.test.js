import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('heading text', () => {
  const { getByText } = renderWithRouter(<NotFound />);

  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('not found image', () => {
  const { getByTestId } = renderWithRouter(<NotFound />);

  const image = getByTestId('not-found-image');
  expect(image.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
