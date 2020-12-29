import React from 'react';
import { render } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokeData from '../data';

test('if there is not found message case zero pokemons are selected', () => {
  const { container, getByText } = render(<FavoritePokemons />);
  const zeroFound = 0;

  const favorites = container.querySelectorAll('.favorite-pokemon');
  const notFoundMessage = getByText('No favorite pokemon found');

  expect(favorites.length).toBe(zeroFound);
  expect(notFoundMessage).toBeInTheDocument();
});

test('if all favorite pokemons are showned', () => {
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ pokeData } />);
  const onlyOne = 1;

  const favorites = container.querySelectorAll('.favorite-pokemons');
  expect(favorites.length).toBe(onlyOne);
});

test('if no pokemon will be showned since its not marked', () => {
  const data = [];
  const zero = 0;
  const { container } = renderWithRouter(<FavoritePokemons pokemons={ data } />);

  const favorite = container.querySelectorAll('.favorite-pokemon');
  expect(favorite.length).toBe(zero);
});
