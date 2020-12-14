import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';
import renderWithRouter from './renderWithRouter';
import pokemons from '../data';

describe('testing Pokedex component', () => {
  test('if it contains a h2 heading with the text Encountered pokémons', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );

    const title = getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('if it contains a heading', () => {
    const { container } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const title = container.querySelectorAll('h2');
    expect(title.length).toBe(1);
  });

  test('if shows only one pokemon at time', () => {
    const { getAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const dataTestId = getAllByTestId('pokemon-name');
    expect(dataTestId.length).toBe(1);
  });

  test('if has filter buttons', () => {
    const { getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
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
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ {} } />,
    );
    const buttonContent = getByText(/All/i);
    expect(buttonContent).toBeInTheDocument();
    fireEvent.click(buttonContent);
  });
});
