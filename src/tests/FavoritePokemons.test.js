import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testing "FavoritePokemons.js" file:', () => {
  it(`Should exhibit the following text: "No favorite pokemon found",
  if no favorite pokemon is available`, () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText('No favorite pokemon found');
    expect(text).toBeInTheDocument();
  });

  it('Should exhibit all cards of the favorite pokemons', () => {
    const id1 = 25;
    const id2 = 4;
    const pokemon1 = pokemons.find((pokemon) => pokemon.id === id1);
    const pokemon2 = pokemons.find((pokemon) => pokemon.id === id2);
    const favoritePokemons = [pokemon1, pokemon2];
    // Desenvolvimento a seguir adaptado a partir da solução feita por Dan:
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemons } />);
    const pikachu = screen.queryByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText('Charmander');
    expect(charmander).toBeInTheDocument();
  });

  it('Should exhibit no pokemon card if no pokemon is marked as favorite', () => {
    renderWithRouter(<FavoritePokemons />);
    const mew = screen.queryByText('Mew');
    expect(mew).not.toBeInTheDocument();
  });
});
