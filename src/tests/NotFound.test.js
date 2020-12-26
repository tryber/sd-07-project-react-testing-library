import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

test('page must contain heading with text "Page requested not found"', () => {
  const { getByText } = renderWithRouter(<NotFound />);
  const heading = getByText(/Page requested not found/i);
  expect(heading).toBeInTheDocument();
  expect(heading.tagName.toLowerCase()).toBe('h2');
});

test('page must contain image of a crying pikachu', () => {
  const { getByAltText } = renderWithRouter(<NotFound />);
  const img = getByAltText('Pikachu crying because the page requested was not found');
  const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
  expect(img).toBeInTheDocument();
  expect(img).toHaveAttribute('src', URL);
});