import React from 'react';
import { screen } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import favPoke from '../mocks/pokeMocks';
import noFavPoke from '../mocks/noFavPokes';
import renderWithRouter from '../services/renderWithRouter';

describe('testing About.js', () => {
  test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
    renderWithRouter(
      <FavoritePokemons pokemons={ [] } />,
    );
    const noFavoriteYet = screen.getByText(/No favorite pokemon found/i);
    expect(noFavoriteYet).toBeInTheDocument();
  });

  test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
    renderWithRouter(
      <FavoritePokemons pokemons={ favPoke } />,
    );
    favPoke.forEach((favorite) => {
      expect(screen.getByText(favorite.name)).toBeInTheDocument();
    });
  });

  test('test if for non pokemons favorited return "No favorite pokemon found"', () => {
    renderWithRouter(
      <FavoritePokemons pokemons={ favPoke } />,
    );
    noFavPoke.forEach((notFavorite) => {
      expect(screen.queryByText(notFavorite.name)).not.toBeInTheDocument();
    });
  });
});
