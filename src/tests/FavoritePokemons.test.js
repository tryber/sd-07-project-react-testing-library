import React from 'react';
import { render, screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Requirement 3', () => {
  it('should display No Favoreite pokemon if no fav pokemon', () => {
    render(<FavoritePokemons />);
    expect(screen.getByText('No favorite pokemon found'));
  });

  it('displays all fav pokemons cards', () => {
    const favoritePokemon = [pokemons[0], pokemons[1]];
    renderWithRouter(<FavoritePokemons pokemons={favoritePokemon} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });

  it('displays no cards when pokemon isnt favorite', () => {
    const favoritePokemon = [];
    renderWithRouter(<FavoritePokemons pokemons={favoritePokemon} />);
    expect(screen.queryByText('Pikachu')).not.toBeInTheDocument();
    expect(screen.queryByText('Charmander')).not.toBeInTheDocument();
  });
});
