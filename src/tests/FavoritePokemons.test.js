import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';
import pokemons from '../data';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('testa caso não tenha pokemons favoritos', () => {
    const
      { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavoritePokemons = getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('testa se aparece o pokemon favorito', () => {
    const favoritePokemon = [pokemons[0], pokemons[2]];

    const {
      getByText,
      queryByText,
    } = renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);

    const caterpie = getByText('Caterpie');
    const pikachu = getByText('Pikachu');
    expect(caterpie).toBeInTheDocument();
    expect(pikachu).toBeInTheDocument();
    expect(queryByText('Ekans')).not.toBeInTheDocument();
  });
});
