import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testando NotFound.js', () => {
  it('testa se exibe um "h2" com o texto "Page requested not found 😭"', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const heading = getByRole('heading', { level: 2 });

    expect(heading).toHaveTextContent('Page requested not found 😭');
  });
  it('testa se exibe uma imagem específica', () => {
    const IMAGE = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const { container } = renderWithRouter(<NotFound />);
    const notFoundImage = container.getElementsByClassName('not-found-image')[0].src;

    expect(notFoundImage).toBe(IMAGE);
  });
});
