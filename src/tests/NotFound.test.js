import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se página contém um heading e texto Page requested not found 😭', () => {
    const { getByRole } = renderWithRouter(<NotFound />);
    const about = getByRole('heading', {
      name: 'Page requested not found Crying emoji',
    });
    expect(about).toBeInTheDocument();
  });
  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = getByAltText(
      'Pikachu crying because the page requested was not found',
    );
    expect(img.src).toBe(src);
  });
});
