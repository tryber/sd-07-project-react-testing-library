import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Testando o arquivo NotFound.js', () => {
  it('A página contém um heading h2 com o texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const secondImage = 1;
    const img = getAllByRole('img')[secondImage];

    expect(img.src).toBe(
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
