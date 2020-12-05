import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Testing FavoritePokemons.js file', () => {
  test('if no pokemon is favorite, renders `No favorite pokemon found` message', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found'));
  });

  test('shows all favorite pokemons card', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  test('shows no card when pokemon isnt favorite', () => {
    const favoritePokemon = [pokemons[0]];
    renderWithRouter(<FavoritePokemons pokemons={ favoritePokemon } />);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
    expect(screen.queryByText('Snorlax')).not.toBeInTheDocument();
  });
});
