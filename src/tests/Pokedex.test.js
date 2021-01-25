import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import Pokemon from '../data';

describe('Testing the Pokedex.js file', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    const { getByRole } = renderWithRouter(<Pokedex
      pokemons={ Pokemon }
      isPokemonFavoriteById={ { 25: false } }
    />);
    expect(getByRole('heading', { level: 2 })).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista', () => {
    const pokemon = [Pokemon[0], Pokemon[1]];
    const { getByText } = renderWithRouter(<Pokedex
      pokemons={ pokemon }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);
    const pokemonDefault = getByText('Pikachu');
    expect(pokemonDefault).toBeInTheDocument();

    const nextPokemonBtn = getByText('Próximo pokémon');
    fireEvent.click(nextPokemonBtn);

    const nextPokemon = getByText('Charmander');
    expect(nextPokemon).toBeInTheDocument();

  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    const { getAllByTestId } = renderWithRouter(<Pokedex
      pokemons={ [Pokemon[0], Pokemon[1]] }
      isPokemonFavoriteById={ { 25: false, 4: false } }
    />);

    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    
  });
});
