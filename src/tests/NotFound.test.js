import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando a página NotFound.', () => {
  it('Contem um heading h2 com o texto "Page requested not found 😭"', () => {
    const { getByText, container } = renderWithRouter(<NotFound />);
    const pageText = getByText(/Page requested not found/i);
    expect(pageText).toBeInTheDocument();
    const heading = container.querySelector('h2');
    expect(heading).toBeInTheDocument();
  });

  it('Contém a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif".', () => {
    const { container } = renderWithRouter(<NotFound />);
    const findImage = container.querySelector('img');
    expect(findImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
