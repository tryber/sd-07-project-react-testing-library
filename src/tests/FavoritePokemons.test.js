import React from 'react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemon from '../data';

describe('Testing the FavoritePokemons.js file', () => {
  it('whether the message No favorite pokemon found is displayed on the screen', () => {
    const { getByText } = renderWithRouter(<FavoritePokemons />);
    expect(getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('if all favorite Pokémon cards are displayed.', () => {
    const favpokemon = [pokemon[0], pokemon[1]];
    const { getByText } = renderWithRouter(<FavoritePokemons pokemons={ favpokemon } />);
    expect(getByText('Pikachu')).toBeInTheDocument();
    expect(getByText('Charmander')).toBeInTheDocument();
  })
});
