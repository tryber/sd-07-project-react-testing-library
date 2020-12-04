import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se página ... requested not found 😭;', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toBeDefined();
    expect(heading.innerHTML.includes('Page requested not found')).toBe(true);
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { queryAllByRole } = renderWithRouter(<NotFound />);
    const imgs = queryAllByRole('img');

    const img = imgs.find((img2) => img2.src === 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');

    expect(img).toBeInTheDocument();
  });
});
