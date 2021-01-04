import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('testing Pokedex.js component', () => {
  it('should contain heading with Encountered Pokemons text', () => {
    const pokemon = [pokemons[0]];
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByRole('heading', { level: 2 })).toHaveTextContent('Encountered pokémons');
  });

  it('should contain a button with próximo pokémon text', () => {
    const pokemon = [pokemons[0]];
    const { getByTestId } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByTestId('next-pokemon')).toHaveTextContent('Próximo pokémon');
  });

  it('should show next pokemon when clicking next button', () => {
    const pokemon = [pokemons[0], pokemons[1]];
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);
    fireEvent.click(getByTestId('next-pokemon'));
    expect(getByText('Charmander')).toBeInTheDocument();
  });

  it('should show first pokemon when clicking next button after last pokemon', () => {
    const pokemon = [pokemons[0], pokemons[8]];
    const { getByTestId, getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false, 148: false } }
    />);
    fireEvent.click(getByTestId('next-pokemon'));
    fireEvent.click(getByTestId('next-pokemon'));
    expect(getByText('Pikachu')).toBeInTheDocument();
  });
});
