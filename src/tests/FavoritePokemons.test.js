import React from 'react';
import { cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

afterEach(cleanup);

test('page must contain "No favorite pokemon found" text', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});
test('page must render cards of favorited pokemons', () => {
  const pokelist = [pokemons[0], pokemons[2]];
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokelist } />);
  expect(getByText(/pikachu/i)).toBeInTheDocument();
  expect(getByText(/caterpie/i)).toBeInTheDocument();
});
test('page must not render cards of not favorited pokemons', () => {
  const pokelist = [pokemons[0], pokemons[2]];
  const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokelist } />);
  expect(queryByText(/charmander/i)).toBeNull();
});
