import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

afterEach(cleanup);

describe('', () => {
  test('if there is no favorite pokemon, shows a message that say so', () => {
    const { getByText } = render(<FavoritePokemons />);

    const messageNoFavorite = getByText(/No favorite pokemon found/i);
    expect(messageNoFavorite).toBeInTheDocument();
  });

  test('if shows all cards of favorite pokemons', () => {
    const card = [{ name: '', type: '', image: '', averageWeight: '' }];
    const { getByText } = render(
      <MemoryRouter>
        <FavoritePokemons pokemons={ card } />
      </MemoryRouter>,
    );

    const messageFavorite = getByText(/Average weight/i);
    expect(messageFavorite).toBeInTheDocument();
  });
});
