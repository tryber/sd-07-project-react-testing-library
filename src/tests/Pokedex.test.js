import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './RenderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('testing the Pokedex component', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  test('if cointain a header h2 with the text "Encountered pokemon"', () => {
    const encountered = screen.getByText(/encountered pokémons/i);

    expect(encountered).toBeInTheDocument();
  });

  test('when "Próximo pokémon" clicked show the next pokemon in the list', () => {
    const nextPokemonButton = screen.getByText(/Próximo pokémon/);
    const previousPokemon = screen.getByTestId('pokemon-name').innerHTML;
    fireEvent.click(nextPokemonButton);
    const currentPokemon = screen.getByTestId('pokemon-name').innerHTML;

    expect(previousPokemon).not.toEqual(currentPokemon);
  });

  it('should show the first Pokemon when clicked next button in the last pokemon', () => {
    const firstPokemon = screen.getByTestId('pokemon-name').innerHTML;
    const nextPokemonButton = screen.getByText(/Próximo pokémon/);

    pokemons.forEach(() => {
      fireEvent.click(nextPokemonButton);
    });

    const lastPokemon = screen.getByTestId('pokemon-name').innerHTML;

    expect(firstPokemon).toBe(lastPokemon);
  });

  it('should show only one pokemon each time', () => {
    const nextPokemonButton = screen.getByText(/Próximo pokémon/);

    pokemons.forEach(() => {
      const pokemon = screen.getAllByTestId('pokemon-name');
      expect(pokemon.length).toBe(1);
      fireEvent.click(nextPokemonButton);
    });
  });

  test('if Pokedéx has the filter buttons and the reset filter button', () => {
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    const nextPokemonButton = screen.getByText(/Próximo pokémon/);
    const allButton = screen.getByText('All');

    typeButtons.forEach((button) => {
      fireEvent.click(button);
      const buttonText = button.innerHTML;
      const pokemonType = screen.getByTestId('pokemonType').innerHTML;

      expect(buttonText).toBe(pokemonType);
    });

    fireEvent.click(allButton);
    const firstPokemonType = screen.getByTestId('pokemonType').innerHTML;
    fireEvent.click(nextPokemonButton);
    const secondPokemonType = screen.getByTestId('pokemonType').innerHTML;
    expect(firstPokemonType).not.toBe(secondPokemonType);
  });
});
