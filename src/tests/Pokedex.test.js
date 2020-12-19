import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';

const somePokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: {
      value: '6.0',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map: 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: '',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: '',
  },
];

test('renders a heading with the text `Encountered pokémons`', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
  );
  const heading = getByText('Encountered pokémons');
  expect(heading).toBeInTheDocument();
  expect(heading.tagName).toBe('H2');
});

describe('test if next pokemon is shown on screen when `next` button is clicked.', () => {
  test('if button have `Encountered pokémons` inside text.', () => {
    const { getByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    expect(nextButton).toBeInTheDocument();
  });
  test('if changes pokemon when next button is clicked.', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    const currentPokemon = `${getByTestId('pokemon-name').textContent}`;
    fireEvent.click(nextButton);
    const nextPokemon = getByTestId('pokemon-name').textContent;
    expect(currentPokemon).not.toBe(nextPokemon);
  });
  test('if first pokemon is shown when next button is clicked at last pokemon.', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    const currentPokemon = `${getByTestId('pokemon-name').textContent}`;
    pokemons.forEach(() => fireEvent.click(nextButton));
    const nextPokemon = getByTestId('pokemon-name').textContent;
    expect(currentPokemon).toBe(nextPokemon);
  });
  test('if first pokemon is shown when next button is clicked at last pokemon.', () => {
    const { getByText, getByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const nextButton = getByText(/Próximo pokémon/i);
    const currentPokemon = `${getByTestId('pokemon-name').textContent}`;
    pokemons.forEach(() => fireEvent.click(nextButton));
    const nextPokemon = getByTestId('pokemon-name').textContent;
    expect(currentPokemon).toBe(nextPokemon);
  });
});
describe('test if pokedex have filter buttons.', () => {
  test('if pokedex render only filtered pokemons by selected type.', () => {
    const pokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
    ];
    const { queryAllByTestId, queryByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const typeButtonList = queryAllByTestId('pokemon-type-button');
    expect(typeButtonList).toHaveLength(pokemonTypes.length);
    typeButtonList.forEach((typeButton) => {
      fireEvent.click(typeButton);
      const pokemonType = queryByTestId('pokemonType').textContent;
      expect(pokemonType).toBe(typeButton.textContent);
    });
  });
});
describe('test if pokedex have a reset button.', () => {
  test('if button text is `All`', () => {
    const { queryByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const resetButton = queryByText('All');
    expect(resetButton).toBeInTheDocument();
    expect(resetButton.tagName).toBe('BUTTON');
  });
  test('if all pokemons are shown when reset button is clicked.', () => {
    const { queryByText, queryByTestId, queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const resetButton = queryByText('All');
    const typeButton = queryAllByTestId('pokemon-type-button')[0];
    const nextButton = queryByTestId('next-pokemon');
    fireEvent.click(typeButton);
    fireEvent.click(resetButton);
    const pokemonNames = pokemons.map((pokemon) => pokemon.name);
    pokemonNames.forEach((name) => {
      const currentPokemon = queryByTestId('pokemon-name').textContent;
      fireEvent.click(nextButton);
      expect(currentPokemon).toBe(name);
    });
  });
  test('if no filter is applied by default.', () => {
    const { queryByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const nextButton = queryByTestId('next-pokemon');
    const pokemonNames = pokemons.map((pokemon) => pokemon.name);
    pokemonNames.forEach((name) => {
      const currentPokemon = queryByTestId('pokemon-name').textContent;
      fireEvent.click(nextButton);
      expect(currentPokemon).toBe(name);
    });
  });
});
describe('test if the pokedex has dynamically generated type buttons', () => {
  it('should be dynamically generated.', () => {
    const pokemonTypes = [
      ...new Set(somePokemons.reduce((types, { type }) => [...types, type], [])),
    ];
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ somePokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const typeButtonList = queryAllByTestId('pokemon-type-button');
    expect(typeButtonList).toHaveLength(pokemonTypes.length);
  });
  it('should have one type button per pokemon type.', () => {
    const pokemonTypes = [
      ...new Set(pokemons.reduce((types, { type }) => [...types, type], [])),
    ];
    const { queryAllByTestId } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const typeButtonList = queryAllByTestId('pokemon-type-button').map(
      (element) => element.textContent,
    );
    expect(typeButtonList).toHaveLength(pokemonTypes.length);
    expect(typeButtonList).toStrictEqual(pokemonTypes);
  });
  it('should have `All` button always visible.', () => {
    const { queryAllByTestId, queryByText } = renderWithRouter(
      <Pokedex pokemons={ pokemons } isPokemonFavoriteById={ { 25: true } } />,
    );
    const typeButtonList = queryAllByTestId('pokemon-type-button');
    typeButtonList.forEach((typeButton) => {
      fireEvent.click(typeButton);
      const resetButton = queryByText('All');
      expect(resetButton).toBeInTheDocument();
      expect(resetButton).toBeVisible();
    });
  });
});
test('if `next button` is disabled if only one pokemon is on the list.', () => {
  const { getByText } = renderWithRouter(
    <Pokedex pokemons={ [pokemons[0]] } isPokemonFavoriteById={ { 25: true } } />,
  );
  const nextButton = getByText(/Próximo pokémon/i);
  expect(nextButton).toBeInTheDocument();
  expect(nextButton).toBeDisabled();
});
