import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Pokedex from '../components/Pokedex';

const pokemon = [
  { name: 'pikachu', type: 'Electric', image: '', averageWeight: '' },
  { name: 'ekans', type: 'Poison', image: '', averageWeight: '' },
  { name: 'Charmander', type: 'Fire', image: '', averageWeight: '' },
  { name: 'caterpie', type: 'Bug', image: '', averageWeight: '' },
  { name: 'Alakazan', type: 'Psychic', image: '', averageWeight: '' },
  { name: 'snorlax', type: 'Normal', image: '', averageWeight: '' },
  { name: 'Dragonair', type: 'Dragon', image: '', averageWeight: '' },
];
const favorite = {
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
const lengthButton = 7;

afterEach(cleanup);

// prettier-ignore
test('if there is a heading saying Encountered pokémons', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorite } />
    </MemoryRouter>,
  );

  const pokedexMessage = getByText(/Encountered pokémons/i);
  expect(pokedexMessage).toBeInTheDocument();
});

// prettier-ignore
test('if after clicking "Proximo Pokemon", the next pokemon appears', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorite } />
    </MemoryRouter>,
  );

  const beforeClick = getByText(/Pikachu/i);
  expect(beforeClick).toBeInTheDocument();

  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  fireEvent.click(nextButton);

  const afterClick = getByText(/ekans/i);
  expect(afterClick).toBeInTheDocument();
});

// prettier-ignore
test('if it is shown one pokemon at a time', () => {
  const { queryByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorite } />
    </MemoryRouter>,
  );

  const firstPokemon = queryByText(/Pikachu/i);
  const secondPokemon = queryByText(/Ekans/i);

  expect(firstPokemon).not.toBeNull();
  expect(secondPokemon).toBeNull();
});

// prettier-ignore
test('if the Pokedex has every filtered buttons', () => {
  const { getAllByTestId } = render(
    <MemoryRouter>
      <Pokedex pokemons={ pokemon } isPokemonFavoriteById={ favorite } />
    </MemoryRouter>,
  );

  const filteredButtons = getAllByTestId('pokemon-type-button');
  expect(filteredButtons.length).toEqual(lengthButton);

  pokemon.forEach((element, index) => {
    expect(element.type).toEqual(filteredButtons[index].innerHTML);
  });
});

test('if the Pokedex has a reset filter button', () => {
  const { getByText } = render(
    <MemoryRouter>
      <Pokedex pokemons={pokemon} isPokemonFavoriteById={favorite} />
    </MemoryRouter>,
  );

  const resetButton = getByText('All');
  expect(resetButton).toBeInTheDocument();
});
