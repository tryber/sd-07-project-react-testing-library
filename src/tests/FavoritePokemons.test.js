import React from 'react';
import renderWithRender from '../renderWithRouter';
import { fireEvent } from '@testing-library/react';
import App from '../App';

describe('Testando o arquivo FavoritePokemons', () => {
  it('Testando o arquivo FavoritePokemons', () => {
    const { getByText } = renderWithRender(<App />);

    const favoritepoke = getByText(/Favorite pokémons/i);
    expect(favoritepoke).toBeInTheDocument();

    fireEvent.click(getByText(/Favorite pokémons/i));

    const favoritepokemon = getByText(/No favorite pokemon found/i);
    expect(favoritepokemon).toBeInTheDocument();

  });
});
