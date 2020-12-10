import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

test('if render `No favorite pokémon found` if favorite pokémons list is empty', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ [] } />);
  const notFound = getByText('No favorite pokemon found');
  expect(notFound).toBeInTheDocument();
});

test('if render all favorited pokemons', () => {
  const fav = [
    {
      averageWeight: { measurementUnit: '', value: '' },
      id: 1,
      image: '',
      name: '',
      type: '',
    },
    {
      averageWeight: { measurementUnit: '', value: '' },
      id: 2,
      image: '',
      name: '',
      type: '',
    },
    {
      averageWeight: { measurementUnit: '', value: '' },
      id: 3,
      image: '',
      name: '',
      type: '',
    },
    {
      averageWeight: { measurementUnit: '', value: '' },
      id: 4,
      image: '',
      name: '',
      type: '',
    },
  ];
  const { getAllByAltText } = renderWithRouter(
    <FavoritePokemons pokemons={ fav } />,
  );
  const expectedLength = 4;
  const favoritePokemons = getAllByAltText(/is marked as favorite/i);
  expect(favoritePokemons).toHaveLength(expectedLength);
});
