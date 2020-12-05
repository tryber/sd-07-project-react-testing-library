import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('check if No favorite pokemon found is displayed, if no favorite pokemon.', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const message = getByText(/No favorite pokemon found/i);
    expect(message).toBeInTheDocument();
  });

  it('check to see if all favorite Pokémon cards are displayed.', () => {
    const favorites = [pokemons[0], pokemons[1]];
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favorites } />,
    );

    expect(getByText(favorites[0].name)).toBeInTheDocument();
    expect(getByText(favorites[1].name)).toBeInTheDocument();
  });

  it('deve não encontrar um pokemon não favoritado', () => {
    const favorites = [pokemons[0], pokemons[1]];

    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favorites } />,
    );

    expect(queryByText(pokemons[2].name)).toBe(null);
  });
});
