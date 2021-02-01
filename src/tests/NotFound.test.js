import React from 'react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('Verificando o NotFound.js', () => {
  it('contém um heading h2 com o texto Page requested not found', () => {
    const { getByText } = renderWithRouter(<NotFound />);
    const error = getByText('Page requested not found');
    expect(error).toBeInTheDocument();
  });
  it(' mostra uma imagem especificada', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const image = getByAltText('Pikachu crying because the page requested was not found');
    expect(image).toContainHTML('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(image).toBeInTheDocument();
  });
});
