import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import NotFound from '../components/NotFound';

test('renders a heading with the text `Page requested not found`', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const heading = getByText('Page requested not found');
  expect(heading).toBeInTheDocument();
});

test('renders a image with specific source`', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const image = getByAltText('Pikachu crying because the page requested was not found');
  expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
