import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Testing the NotFound.js file', () => {
  it('The page contains an h2 header with the text Requested page not found 😭', () => {
    const { container } = renderWithRouter(<NotFound />);
    const notFound = container.querySelector('h2');
    const notFoundEmoji = container.querySelector('h2 > span');
    expect(notFound.innerHTML).toContain('Page requested not found');
    expect(notFoundEmoji.innerHTML).toContain(' 😭');
  });

  it('The page shows the image of the crying Pikachu', () => {
    const { container } = renderWithRouter(<NotFound />);
    const image = container.querySelector('img');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
