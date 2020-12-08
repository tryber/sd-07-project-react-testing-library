import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Testando o arquivo NotFound.js', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', { level: 2 });
    expect(h2.textContent).toBe('Page requested not found 😭');
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);

    const img = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
