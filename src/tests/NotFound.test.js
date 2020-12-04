import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

it('should contain a h2 heading with the text: Page requested not found ', () => {
  const { getByText } = renderWithRouter(<NotFound />);

  const heading = getByText(/Page requested not found/);
  expect(heading).toBeInTheDocument();
});

it('should contain an image representing a missing link', () => {
  const { getAllByRole } = renderWithRouter(<NotFound />);
  const srcImgToFind = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  const image = getAllByRole('img');

  expect(image[1].src).toBe(srcImgToFind);
});
