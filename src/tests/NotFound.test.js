import React from 'react';
import renderWithRouter from './RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Requisito 4: Testando o arquivo NotFound.js', () => {
  it('Testa se página contém um heading h2 com o texto Page requested not found', () => {
    const { queryByText } = renderWithRouter(<NotFound />);
    const notFoundTitle = queryByText(/Page requested not found/i);

    expect(notFoundTitle.tagName).toBe('H2');
  });

  it('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { getByAltText } = renderWithRouter(<NotFound />);
    const altText = 'Pikachu crying because the page requested was not found';
    const imageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const favoritePokemonImage = getByAltText(altText);

    expect(favoritePokemonImage.src).toBe(imageURL);
  });
});
