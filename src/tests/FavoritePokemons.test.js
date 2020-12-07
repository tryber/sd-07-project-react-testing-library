import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { FavoritePokemons } from '../components';
import favoriteMock from '../mocks/mockFavoritePokemons';

describe('testing the favorite Pokemons page', () => {
  test(`the page shows "No favorite pokemon found" 
    if doesn't have any favorite Pokemon`, () => {
    const array = [];
    const { getByText } = render(<FavoritePokemons pokemons={ array } />);
    const noFavoritePokemon = getByText(/\bNo favorite pokemon found\b/i);
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('shows all favorite Pokemons cards', () => {
    const { pokemons } = favoriteMock;
    render(
      <FavoritePokemons pokemons={ pokemons } />,
      { wrapper: MemoryRouter },
    );
    const favoritePokemon = screen.getAllByTestId('pokemon-name').length;
    expect(favoritePokemon).toBe(pokemons.length);
  });
});
