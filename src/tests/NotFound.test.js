import React from 'react';
import NotFound from '../components/NotFound';

const { default: renderWithRouter } = require('../components/renderWithRouter');

describe('Testing NotFound.js functionality', () => {
  it('Should have a header 2', () => {
    const { getByRole, getByText } = renderWithRouter(<NotFound />);
    const header2 = getByRole('heading', { level: 2 });
    expect(header2.tagName.toLowerCase()).toBe('h2');
    const textNotFound = getByText(/Page requested not found/i);
    expect(textNotFound).toBeInTheDocument();
  });

  it('Should show a image of pikachu crying', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const img = getByAltText('Pikachu crying because the page requested was not found');
    expect(img).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
