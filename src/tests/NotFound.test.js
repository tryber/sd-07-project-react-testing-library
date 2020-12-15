import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('testing NotFound component', () => {
  test('if it contains a h2 heading with the text Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const notFOund = getByText(/Page requested not found/i);
    expect(notFOund).toBeInTheDocument();
  });

  test('if it contains a heading', () => {
    const { container } = renderWithRouter(<NotFound />);
    const title = container.querySelectorAll('h2');
    expect(title.length).toBe(1);
  });
  test('if hs the correct URL', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
