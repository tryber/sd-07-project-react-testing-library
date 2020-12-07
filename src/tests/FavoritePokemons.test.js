import React from 'react';
import { cleanup } from '@testing-library/react';
import FavoritePokemons from '../components/FavoritePokemons';
import renderWithRouter from '../helpers/renderWithRouter';
import pokemons from '../helpers/FavoritesData';

afterEach(cleanup);

describe('Testing the FavoritePokemons.js file', () => {
  it(' the message No favorite pokemon found', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    const text = getByText('No favorite pokemon found');

    expect(text).toBeInTheDocument();
  });
  it(' all favorite Pokémon cards are displayed', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    const text = getByText('Caterpie');

    expect(text).toBeInTheDocument();
  });
  it(' no Pokémon card is displayed, if it is not favored.', () => {
    const { queryByText } = renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);
    expect(queryByText('Pikachu')).toBeNull();
  });
});
