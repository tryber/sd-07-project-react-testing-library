import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import data from '../data';

describe('Requisito 3', () => {
  test('renderiza nenhum pokemon favoritado', () => {
    const { getByText, queryByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');
    const query = queryByText('pokemon-name');
    expect(query).not.toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
  test('renderiza os pokemons favoritados', () => {
    const favoritesPokemons = data;
    const { getAllByTestId } = renderWithRouter(
      <FavoritePokemons pokemons={ favoritesPokemons } />,
    );
    const favoritesPokemonsQuantity = getAllByTestId('pokemon-name').length;
    expect(favoritesPokemons.length).toBe(favoritesPokemonsQuantity);
  });
});
