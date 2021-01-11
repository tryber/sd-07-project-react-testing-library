import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

test('heading text', () => {
  const { getByText } = renderWithRouter(<NotFound />);

  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
});

test('not found image', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);

  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe(
    'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
  );
});
