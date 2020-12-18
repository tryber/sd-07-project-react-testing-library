import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testing "Pokedex.js" file:', () => {
  const favoritePokemonsById = {
    4: false,
    10: false,
    23: false,
    25: false,
    65: false,
    78: false,
    143: false,
    148: false,
    151: false,
  };

  it('Should contain h2 heading with text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonsById }
      />, // App.js
    );
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2.textContent).toContain('Encountered pokémons');
  });

  describe(`When the button "Próximo pokémon" is clicked,
    the next pokemon on the list must be displayed`, () => {
    test('Button must contain text "Próximo pokémon"', () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoritePokemonsById }
        />,
      );
      const nextBtn = screen.getByTestId('next-pokemon');
      expect(nextBtn).toBeInTheDocument();
      expect(nextBtn).toHaveTextContent('Próximo pokémon');
    });

    test(`Each pokemon must be exhibited when the button is clicked.
      When the button is clicked at the last pokemon, the first pokemon must be returned`,
    () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoritePokemonsById }
        />,
      );
      pokemons.forEach((pokemon) => {
        const pokemonDisplayed = screen.getByText(pokemon.name);
        expect(pokemonDisplayed).toBeInTheDocument();

        const nextBtn = screen.getByTestId('next-pokemon');
        fireEvent.click(nextBtn);
      });
      expect(screen.getByText('Pikachu')).toBeInTheDocument();
    });
  });
});
