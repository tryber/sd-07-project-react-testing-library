import React from 'react';
import { fireEvent } from '@testing-library/react';
import Pokedex from '../components/Pokedex';

import renderWithRouter from '../renderWithRouter';

import data from '../data';

test('if there is an h2 with Encountered pokemons message', () => {
  const { getByRole } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ [] }
    />,
  );

  const headingElement = getByRole('heading');

  expect(headingElement).toHaveTextContent('Encountered pokémons');
});

test('if there is a button with the text Próximo pokémon', () => {
  const { getByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ [] }
    />,
  );

  const nextButton = getByTestId('next-pokemon');

  expect(nextButton).toHaveTextContent('Próximo pokémon');
});

test('onClick next pokemon shoul return to the first', () => {
  const { getByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ data }
      isPokemonFavoriteById={ [] }
    />,
  );

  const nextButton = getByTestId('next-pokemon');
  const pokemon = getByTestId('pokemon-name');

  expect(nextButton).toHaveTextContent('Próximo pokémon');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Charmander');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Caterpie');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Ekans');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Alakazam');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Mew');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Rapidash');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Snorlax');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Dragonair');

  fireEvent.click(nextButton);
  expect(pokemon.innerHTML).toBe('Pikachu');
});
