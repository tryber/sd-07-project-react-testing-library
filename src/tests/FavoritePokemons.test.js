import React from 'react';
import renderWithRender from '../renderWithRouter';
import App from '../App';

describe('Testando o arquivo FavoritePokemons', () => {
  it('Testando o arquivo FavoritePokemons', () => {
    const { getByText } = renderWithRender(<App />);

    const favoritepoke = getByText(/Favorite pokémons/i);
    expect(favoritepoke).toBeInTheDocument();
  });
});
