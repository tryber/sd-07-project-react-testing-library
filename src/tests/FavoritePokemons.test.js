import React from 'react';
import { render } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';

test('testa se é exibido na tela o texto No "favorite pokemon found"', () => {
  const { getByText } = render(<FavoritePokemons />);

  const text = getByText(/No favorite pokemon found/i);
  expect(text).toBeInTheDocument();
});
