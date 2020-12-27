import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../renderWithRouter';

test('Should render a heading whith a h2', () => {
  const { container } = renderWithRouter(<NotFound />);
  const notFound = container.querySelector('h2');
  expect(notFound).toHaveTextContent('Page requested not found');
});

test('Should render a image ', () => {
  const { container } = renderWithRouter(<NotFound />);
  const image = container.querySelector('img');
  expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
