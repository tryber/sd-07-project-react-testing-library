import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

describe('Testing "Pokedex.js" file:', () => {
  const favoritePokemonsById = {}
    pokemons.forEach(pokemons => {
      favoritePokemonsById[pokemons.id] = false
    })

  it('Should contain h2 heading with text "Encountered pokémons"', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonsById }
      />, // App.js
    );
    const h2 = screen.getByRole('heading', { level: 2 });
    expect(h2).toBeInTheDocument();
    expect(h2).toHaveTextContent('Encountered pokémons');
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

  it('Should display only one pokemon at a time', () => {
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ favoritePokemonsById }
      />,
    );
    const valueExpected = 1
    const pokemonOnScreen = screen.getAllByTestId('pokemon-name');
    expect(pokemonOnScreen).toHaveLength(valueExpected);
  });

  describe('Pokedex must contain filter buttons', () => {
    test(`When a type button is selected, Pokedex should mark that only pokemon type`, () => {
      renderWithRouter(
        <Pokedex
          pokemons={ pokemons }
          isPokemonFavoriteById={ favoritePokemonsById }
        />
      )
      // Array de tipos:
      const types = [];
      pokemons.forEach(pokemon => !types.includes(pokemon.type) && types.push(pokemon.type))

      const btnFilters = screen.getAllByTestId('pokemon-type-button')
      const nextBtn = screen.getByTestId('next-pokemon');

      types.forEach(type => {
        const btn = btnFilters.find(item => item.textContent == type)
        expect(btn).toHaveTextContent(type)

        fireEvent.click(btn);

        const filteredPokemons = pokemons.filter(pokemon => pokemon.type == type)
        filteredPokemons.forEach(pokemon => {
          const pokemonDisplayed = screen.getByText(pokemon.name)
          expect(pokemonDisplayed).toBeInTheDocument()

        // Linha a seguir adaptada a partir da solução do site:
        // https://stackoverflow.com/questions/13831601/disabling-and-enabling-a-html-input-button
          !nextBtn.disabled && fireEvent.click(nextBtn)
        })
      })
    })
  })
});
