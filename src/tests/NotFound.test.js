import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('not found works correctly', () => {
  test('heading renderer correctly', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const text = getByText(/Page requested not found/i);
    expect(text).toBeInTheDocument();
  });
  test('image renderer correctly', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
