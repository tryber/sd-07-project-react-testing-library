import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

test('The message No favorite pokemon found is displayed on the screen', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const text = getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});

test('All favorite Pokémon cards are displayed', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const [favorite] = container.getElementsByClassName('favorite-pokemons');
  expect(favorite).toBe();
});

test('No Pokémon card is displayed if it is not favored', () => {
  const { container } = renderWithRouter(<FavoritePokemons />);
  const [p] = container.getElementsByTagName('p');
  expect(p).toBeInTheDocument();
  expect(p).toHaveTextContent('No favorite pokemon found');
});
