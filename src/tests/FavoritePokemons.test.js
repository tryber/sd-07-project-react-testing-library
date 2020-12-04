import React from 'react';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

test('The message No favorite pokemon found is displayed on the screen', () => {
  const { getByText } = renderWithRouter(<FavoritePokemons />);
  const text = getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});
