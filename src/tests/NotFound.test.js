import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

afterEach(cleanup);

describe('Zero to Hero: Requirement 4 - NotFound.js', () => {
  test('a h2 tag with the text "Page requested not found"', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const notFoundText = getByText(/page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
    expect(notFoundText.tagName).toBe('H2');
  });

  test('if the page has the specified image', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText(/pikachu/i);
    const expectedImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(expectedImage);
  });
});
