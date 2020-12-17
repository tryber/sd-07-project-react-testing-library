import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('If have text Page requested not found 😭 on the page', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  expect(getByRole('heading').textContent).toBe('Page requested not found 😭');
});

test('If have image according to requested', () => {
  const { container } = renderWithRouter(<NotFound />);
  const images = container.getElementsByTagName('img');
  expect(images[0].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
