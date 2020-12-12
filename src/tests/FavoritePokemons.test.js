import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

test('if render `No favorite pokémon found` if favorite pokémons list is empty', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const notFound = getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});

test('if render all favorited pokemons', () => {
  const { getAllByAltText } = renderWithRouter(
    <FavoritePokemons pokemons={ pokemons } />,
  );
  const expectedLength = 9;
  const favoritePokemons = getAllByAltText(/is marked as favorite/i);
  expect(favoritePokemons).toHaveLength(expectedLength);
});

test('if nothing is rendered when pokemons is not favorited.', () => {
  const { queryByAltText } = renderWithRouter(
    <FavoritePokemons pokemons={ [] } />,
  );
  const favoritePokemons = queryByAltText(/is marked as favorite/i);
  expect(favoritePokemons).toBeNull();
});
