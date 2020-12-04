import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4', () => {
  test('verifica se há um h2 com o texto especificado', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const text = getByText('Page requested not found');
    expect(text).toBeInTheDocument();
    expect(text.tagName.toLowerCase()).toBe('h2');
  });
  test('testa se a página mostra uma imagem específica', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
