import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

test('Contains an h2 heading with the text About Pokédex', () => {
  const { getByRole } = renderWithRouter(<NotFound />);
  const title = getByRole('heading');
  expect(title).toHaveTextContent('Page requested not found');
});

test('Page shows the image of the pikachu', () => {
  const { container } = renderWithRouter(<NotFound />);
  const [img] = container.getElementsByClassName('not-found-image');
  expect(img).toBeInTheDocument();
  expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
