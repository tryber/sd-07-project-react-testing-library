import React from 'react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import pokemons from '../data';

describe('Testing FavoritePokemons.js', () => {
  it('Tests if it doesnt have Favorite Pokemons cards', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const noFavoritePokemon = getByText(/No favorite pokemon found/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  it('Tests if it shows all the selected favorite Pokemons', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const pokemonsFavorited = [pokemons[0]];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonsFavorited } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
  });

  it('Tests if no pokemon card is shown if not selected', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons />);
    const pokemonFavorite = [];
    renderWithRouter(<FavoritePokemons pokemons={ pokemonFavorite } />);
    expect(queryByText('Pikachu')).not.toBeInTheDocument();
  });
});
