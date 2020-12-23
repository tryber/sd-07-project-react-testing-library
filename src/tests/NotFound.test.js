import React from 'react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing NotFound page', () => {
  test('page contains a tag "h2" with text "Page requested not found"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const heading = getByRole('heading');
    expect(heading).toHaveTextContent(/Page requested not found/i);
  });

  test('page shows an image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const image = getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
