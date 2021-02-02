import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('contains an h2 heading with the text Page requested not found', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [h2] = container.getElementsByTagName('h2');

  expect(h2).toBeInTheDocument();
  expect(h2).toHaveTextContent(/Page requested not found/i);
});

test('page shows the image', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [img] = container.getElementsByTagName('img');

  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
