import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testing the NotFound.js file', () => {
  it('if a page contains an h2 heading with the text Page requested not found', () => {
    const { getByText, getByRole } = renderWithRouter(<NotFound />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });
  it('if the page shows the image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altText = getByAltText(
      'Pikachu crying because the page requested was not found',
    ).src;
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(altText).toBe(url);
  });
});
