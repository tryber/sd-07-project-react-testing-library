import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const isPokemonFavoriteById = {
  25: true,
};

test('page must contain heading with text "Encountered pokémons"', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const heading = getByText(/Encountered pokémons/i);
  expect(heading).toBeInTheDocument();
  expect(heading.tagName.toLowerCase()).toBe('h2');
});

test('page must contain button with text "Próximo pokémon"', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
});
test('next pokemon must be shown on screen when "next" button is clicked.', () => {
  const { getByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const button = getByText(/Próximo pokémon/i);
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Caterpie')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Ekans')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Alakazam')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Mew')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Rapidash')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Snorlax')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Dragonair')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Pikachu')).toBeInTheDocument();
});
test('page should only show one pokemon at a time', () => {
  const { getByText, queryByText } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const button = getByText(/Próximo pokémon/i);
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(button);
  expect(getByText('Charmander')).toBeInTheDocument();
  expect(queryByText('Pikachu')).not.toBeInTheDocument();
});
test('page must have filter buttons', () => {
  const { getByText, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const typeButton = getAllByTestId(/pokemon-type-button/i);
  const nextButton = getByText(/Próximo pokémon/i);
  expect(typeButton[1].textContent).toBe('Fire');
  fireEvent.click(typeButton[1]);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(getByText('Rapidash')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(getByText('Charmander')).toBeInTheDocument();
});
test('page must have filter reset button with "All" text', () => {
  const { getByText, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const nextButton = getByText(/Próximo pokémon/i);
  const resetFilterButton = getByText(/All/i);
  const typeButton = getAllByTestId(/pokemon-type-button/i);
  expect(resetFilterButton).toBeInTheDocument();
  expect(resetFilterButton.tagName.toLowerCase()).toBe('button');
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(typeButton[1]);
  expect(getByText('Charmander')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(getByText('Rapidash')).toBeInTheDocument();
  fireEvent.click(resetFilterButton);
  expect(getByText('Pikachu')).toBeInTheDocument();
  fireEvent.click(nextButton);
  expect(getByText('Charmander')).toBeInTheDocument();
});
test('buttons should be created dynamically for each pokemon type', () => {
  const { getAllByTestId, getAllByRole } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const buttons = getAllByRole('button');
  const length9 = 9;
  const length7 = 7;
  expect(buttons.length).toBe(length9);
  expect(buttons[0].textContent).toBe('All');
  expect(buttons[8].textContent).toBe('Próximo pokémon');
  const typeButton = getAllByTestId('pokemon-type-button');
  expect(typeButton.length).toBe(length7);
  expect(typeButton[0].textContent).toBe('Electric');
  expect(typeButton[1].textContent).toBe('Fire');
  expect(typeButton[2].textContent).toBe('Bug');
  expect(typeButton[3].textContent).toBe('Poison');
  expect(typeButton[4].textContent).toBe('Psychic');
  expect(typeButton[5].textContent).toBe('Normal');
  expect(typeButton[6].textContent).toBe('Dragon');
});
test('button "Próximo Pokémon" must be disabled if filtered list has one pokemon', () => {
  const { getByText, getAllByTestId } = renderWithRouter(
    <Pokedex
      pokemons={ pokemons }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );
  const nextButton = getByText(/Próximo pokémon/i);
  const typeButton = getAllByTestId(/pokemon-type-button/i);
  expect(nextButton).not.toHaveAttribute('disabled');
  fireEvent.click(typeButton[2]);
  expect(getByText('Caterpie')).toBeInTheDocument();
  expect(nextButton).toHaveAttribute('disabled');
});
