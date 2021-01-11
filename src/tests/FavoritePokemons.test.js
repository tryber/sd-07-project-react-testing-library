import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from './renderWithRouter';

test('mensage not found', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);

  expect(getByText(/No favorite pokemon found/i)).toBeInTheDocument();
});
