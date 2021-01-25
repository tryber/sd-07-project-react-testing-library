import React from 'react';
import pokemons from '../data';
import PokemonDetails from '../components/PokemonDetails';
import renderWithRouter from '../renderWithRouter';

describe('Testing PokemonDetails page', () => {
  test('if specific information for the selected Pokémon is shown on the screen.', () => {
    const pikachuName = pokemons[0];
    const { getByText } = renderWithRouter(<PokemonDetails pokemon={ pikachuName } />);

    const pikachuDetails = getByText('Pikachu Details');
    expect(pikachuDetails).toBeInTheDocument();
  });

  test('should be no navigation link for the details of the selected Pokémon.', () => {
    const pokemon = pokemons[0];
    const { getByText } = renderWithRouter(<PokemonDetails pokemon={ pokemon } />);

    const link = getByText('More details');
    expect(link).not.toBeInTheDocument();
  });
});
