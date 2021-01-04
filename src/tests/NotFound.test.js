import React from 'react';
import NotFound from '../components/NotFound';
import RenderWithRouter from '../renderWithRouter';

describe(' Testando o arquivo NotFound.js', () => {
  test('Teste se página contém um heading e texto "Page requested not found 😭."', () => {
    const { getByText } = RenderWithRouter(<NotFound />);
    const heading = getByText('Page requested not found');
    expect(heading).toBeInTheDocument();
  });

  test('Teste se página mostra imagem do Pikachu.', () => {
    const { getByAltText } = RenderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
