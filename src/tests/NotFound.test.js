import React from 'react';
import NotFound from '../components/NotFound';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    expect(getByText('Page requested not found')).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex...', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
