import React from 'react';
import renderWithRouter from '../helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testes do component notFound', () => {
  test('Teste se página possui heading com texto Page requested not found', () => {
    const { getByRole } = renderWithRouter(<NotFound />);

    const h2 = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se página possui determinada imagem', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);

    const image = getAllByRole('img');

    expect(image[1].src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
