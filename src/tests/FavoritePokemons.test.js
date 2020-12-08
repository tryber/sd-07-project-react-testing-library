import React from 'react';
import { render } from '@testing-library/react';
import { FavoritePokemons } from '../components';

test('testa se é exibido "No favorite pokemon found" se não houver favorito', () => {
  const { getByText } = render(<FavoritePokemons />);
  const noFavorite = getByText(/No favorite pokemon found/i);
  expect(noFavorite).toBeInTheDocument();
});
