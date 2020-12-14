import React from 'react';
import { fireEvent } from '@testing-library/react';

import App from '../App';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing Pokedex component', () => {
  test('if it contains a h2 heading with the text Encountered pokémons', () => {
    const { getByText } = renderWithRouter(<App />);
    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('if it contains a heading', () => {
    const { container } = renderWithRouter(<App />);
    const title = container.querySelectorAll('h2');
    expect(title.length).toBe(1);
  });

  test('if shows the next listed pokémon when the button is clicked on', () => {
    const { getByText } = renderWithRouter(<App />);
    const firstPokemon = getByText(/Pikachu/i);
    expect(firstPokemon).toBeInTheDocument();
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);
    const secondPokemon = getByText(/Charmander/i);
    expect(secondPokemon).toBeInTheDocument();
  });
  test('if shows the first listed pokémon when the last pokemon is clicked on', () => {
    const { getByTestId, getByText } = renderWithRouter(<App />);
    const nextButton = getByText(/Próximo pokémon/i);
    const firstPokemon = getByTestId('pokemon-name').innerHTML;

    pokemons.forEach((pokemon) => {
      pokemon = fireEvent.click(nextButton);
      return pokemon;
    });

    const lastPokemon = getByTestId('pokemon-name').innerHTML;
    expect(firstPokemon).toBe(lastPokemon);
  });

  test('if shows only one pokemon at time', () => {
    const { getAllByTestId } = renderWithRouter(<App />);
    const dataTestId = getAllByTestId('pokemon-name');
    expect(dataTestId.length).toBe(1);
  });

  test('if has filter buttons', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(<App />);
    const dataTestId = getAllByTestId('pokemon-type-button');
    const numberOfButtons = 7;
    expect(dataTestId.length).toBe(numberOfButtons);

    const dataTestIdTypeOf = getByTestId('pokemonType');
    dataTestId.forEach((type) => {
      fireEvent.click(type);
      expect(dataTestIdTypeOf.textContent).toBe(type.textContent);
    });
  });

  test('if has a button to reset the filters', () => {
    const { getByText } = renderWithRouter(<App />);
    const buttonContent = getByText(/All/i);
    expect(buttonContent).toBeInTheDocument();
    fireEvent.click(buttonContent);
  });
});
