import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

test('if page contains an h2 heading with the text Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const text = screen.getByText(/Encountered pokémons/i);
  expect(text).toBeInTheDocument();
});

test('whether the next in the list is displayed when the button is clicked', () => {
  renderWithRouter(<App />);
  const btnNext = screen.getByText(/Próximo pokémon/i);
  pokemons.forEach((item) => {
    const pokemon = screen.getByText(item.name);
    fireEvent.click(btnNext);
    expect(pokemon).toBeInTheDocument();
  });
});

test('should go back to the first if you are in the last', () => {
  renderWithRouter(<App />);
  const btnNext = screen.getByText(/Próximo pokémon/i);
  const nameLast = pokemons[pokemons.length - 1].name;
  const nameFirst = pokemons[0].name;
  while (screen.queryByText(nameLast) === null) {
    fireEvent.click(btnNext);
  }
  expect(screen.queryByText(nameLast)).toBeInTheDocument();
  fireEvent.click(btnNext);
  const firstPokemon = screen.getByText(nameFirst);
  expect(firstPokemon).toBeInTheDocument();
});

test('if only one Pokémon is shown at a time.', () => {
  renderWithRouter(<App />);
  const btnNext = screen.getByText(/Próximo pokémon/i);
  pokemons.forEach(() => {
    fireEvent.click(btnNext);
    const testId = screen.queryAllByTestId('pokemon-name');
    expect(testId.length).toBe(1);
  });
});

test('if Pokédex has the filter buttons', () => {
  renderWithRouter(<App />);
  const filters = screen.getAllByTestId('pokemon-type-button');
  const pokemonsFilters = ['All', ...pokemons.map((item) => item.type)];
  const pokemonsNoRepeating = [];
  pokemonsFilters.forEach((item) => {
    if (!pokemonsNoRepeating.includes(item)) {
      pokemonsNoRepeating.push(item);
    }
  });
  pokemonsNoRepeating.forEach((itemPoke, index) => {
    expect(filters[index]).toHaveTextContent(itemPoke);
  });
});

test('show everyone if the Everyone button is clicked', () => {
  renderWithRouter(<App />);
  const btnAll = screen.getByText(/All/i);
  const btnNext = screen.getByText(/Próximo pokémon/i);
  fireEvent.click(btnAll);
  pokemons.forEach((pokemon) => {
    expect(screen.getByText(pokemon.name)).toBeInTheDocument();
    fireEvent.click(btnNext);
  });
});
