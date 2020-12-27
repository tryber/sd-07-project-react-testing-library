import React from 'react';
import renderWithRouter from '../renderWithRouter';

import NotFound from '../components/NotFound';

test('if contains a heading a not found message', () => {
  const { getByRole } = renderWithRouter(<NotFound />);

  const headingElement = getByRole('heading');

  expect(headingElement).toHaveTextContent('Page requested not found');
});
test('if contains a specific image', () => {
  const { container } = renderWithRouter(<NotFound />);

  const imageContent = container.querySelectorAll('.not-found-image');
  expect(imageContent[0].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
