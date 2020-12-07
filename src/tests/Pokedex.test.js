import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import App from '../App';
import pokemons from '../data';

test('if \'encoutered pokémons\' is in the heading', () => {
  const { getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const header = getByText('Encountered pokémons');
  expect(header).toBeInTheDocument();
});

test('if the next pokémon is displayed when press \'Próximo pokémon\'', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const nextPokemonButton = getByText('Próximo pokémon');
  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Caterpie');

  const seven = 7;
  const zero = 0;
  for (let count = zero; count < seven; count += 1) {
    fireEvent.click(nextPokemonButton);
  }
  expect(pokemonName).toHaveTextContent('Pikachu');
});

test('if only one pokémon is displayed', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const pokemonName = getAllByTestId('pokemon-name');
  expect(pokemonName).toHaveLength(1);
});

test('if filters button is displayed and filtered', () => {
  const { getAllByTestId, getByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const seven = 7;

  const filtersButton = getAllByTestId('pokemon-type-button');
  expect(filtersButton).toHaveLength(seven);
  expect(filtersButton[1]).toHaveTextContent('Fire');

  const pokemonName = getByTestId('pokemon-name');
  const nextPokemonButton = getByText('Próximo pokémon');
  fireEvent.click(filtersButton[1]);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Rapidash');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Charmander');
});

test('if all button is displayed ', () => {
  const { getByText, getByTestId } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const allButton = getByText('All');
  expect(allButton).toHaveTextContent('All');

  const pokemonName = getByTestId('pokemon-name');
  expect(pokemonName).toHaveTextContent('Pikachu');

  const nextPokemonButton = getByText('Próximo pokémon');
  const filterBugButton = getByText('Bug');
  fireEvent.click(filterBugButton);
  expect(pokemonName).toHaveTextContent('Caterpie');
  fireEvent.click(allButton);
  expect(pokemonName).toHaveTextContent('Pikachu');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Charmander');
  fireEvent.click(nextPokemonButton);
  expect(pokemonName).toHaveTextContent('Caterpie');
});

test('if the filter buttons were created dynamically', () => {
  const pokeTypes = [...new Set(pokemons.reduce((types, { type }) => [...types, type],
    []))];
  const { getAllByTestId, getByText } = render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const filtersButton = getAllByTestId('pokemon-type-button');
  const allButton = getByText('All');
  expect(allButton).toBeInTheDocument();

  pokeTypes.forEach((pokemonType, index) => {
    expect(filtersButton[index]).toHaveTextContent(pokemonType);
  });

  const nextPokemonButton = getByText('Próximo pokémon');
  const filterBugButton = getByText('Bug');
  fireEvent.click(filterBugButton);
  expect(nextPokemonButton.disabled).toBeTruthy();
});
