import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../services/renderWithRouter';

describe('testing NotFound.js', () => {
  test('testing if the page has h2', () => {
    const { getByText } = renderWithRouter(<NotFound />);

    const h2Tag = getByText(/Page requested not found/i);
    expect(h2Tag).toBeInTheDocument();
    expect(h2Tag.tagName).toBe('H2');
  });

  test('testa se a página mostra uma imagem específica', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
