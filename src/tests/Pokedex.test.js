import React from 'react';
import { cleanup, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

afterEach(cleanup);

describe('testing the file Pokedex.js', () => {
  test(`the page has a h2 heading with the text 
  "Encountered pokémons"`, () => {
    const { getByText } = renderWithRouter(<App />);
    const heading = getByText(/Encountered pokémons/i);
    expect(heading).toBeInTheDocument();
  });

  test(`the page shows the next Pokemon,
  when the button "Próximo pokémon" is clicked`, () => {
    const { getByText, getAllByTestId } = renderWithRouter(<App />);
    const button = getByText(/Próximo pokémon/i);
    const pokemon = getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1);
    fireEvent.click(button);
    expect(pokemon.length).toBe(1);
  });

  test('the page has the filter buttons', () => {
    const { getByTestId, getAllByTestId } = renderWithRouter(<App />);
    const filterButtons = getAllByTestId('pokemon-type-button');
    filterButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
      fireEvent.click(button);
      const selectedPokemon = getByTestId('pokemonType');
      expect(selectedPokemon.innerHTML).toBe(button.innerHTML);
    });
  });

  test('the page has a button to reset the filter', () => {
    const { getByText } = renderWithRouter(<App />);
    const resetButton = getByText(/All/i);
    fireEvent.click(resetButton);
    const defaultPokemon = getByText('Pikachu');
    expect(defaultPokemon).toBeInTheDocument();
  });
});
