import React from 'react';
import { screen } from '@testing-library/react';
import pokemons from '../data';
import renderWithRouter from './renderWithRouter';
import FavoritePokemon from '../components/FavoritePokemons';

describe('Requiriment 03', () => {
  // Raphael Caputo - linha 7;

  // https://github.com/tryber/sd-07-project-react-testing-library/pull/64/files;

  const addFavoritePokemons = [pokemons[7], pokemons[5]];

  test('1/3', () => {
    renderWithRouter(<FavoritePokemon />);

    const noFavoriteMessage = screen.getByText(/no favorite pokemon found/i);

    expect(noFavoriteMessage).toBeInTheDocument();
  });

  test('2/3', () => {
    renderWithRouter(<FavoritePokemon pokemons={ addFavoritePokemons } />);

    const mew = screen.getByText(/mew/i);
    const snorlax = screen.getByText(/snorlax/i);

    expect(mew).toBeInTheDocument();
    expect(snorlax).toBeInTheDocument();
  });

  test('3/3', () => {
    renderWithRouter(<FavoritePokemon pokemons={ addFavoritePokemons } />);

    const bulbasaur = screen.queryByText(/bulbasaur/i);

    expect(bulbasaur).toBeNull();
  });
});
