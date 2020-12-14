import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing about component', () => {
  test('if it contains information about `Pokédex`', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);

    const noFavorite = getByText(/No favorite pokemon found/i);
    expect(noFavorite).toBeInTheDocument();
  });

  test('if it shows all favorite pokemons`', () => {
    const favoritePok = [pokemons[0], pokemons[2]];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favoritePok } />);
    favoritePok.forEach((favorite) => {
      const pokName = getByText(favorite.name);
      expect(pokName).toBeInTheDocument();
    });
  });

  test('if it doesnt show not favorite pokemons`', () => {
    const favoritePok = [pokemons[0], pokemons[2]];
    const notFavoritePok = [pokemons[1], pokemons[3]];
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritePok } />,
    );
    notFavoritePok.forEach((notFavorite) => {
      const pokName = queryByText(notFavorite.name);
      expect(pokName).not.toBeInTheDocument();
    });
  });
});
