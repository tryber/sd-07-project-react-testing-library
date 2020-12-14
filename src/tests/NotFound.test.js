import React from 'react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa NotFound.js  - requirement4', () => {
  it('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading');
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Page requested not found 😭');
    expect(heading.tagName).toBe('H2');
  });

  it('Teste se página mostra a imagem:', () => {
    const { getAllByRole } = renderWithRouter(<NotFound />);
    const images = getAllByRole('img');
    const matchImage = images.some((image) => image.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(matchImage).toBe(true);
  });
});
