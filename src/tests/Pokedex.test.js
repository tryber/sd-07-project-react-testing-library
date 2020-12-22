import React from 'react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWhithRouter';
import { Pokedex } from '../components';
import data from '../data';

describe('Testing Pokedex.js ⌐> Checks if:', () => {
  test('There is a heading whith message "Encountered pokémons"', () => {
    const mockFavById = { 25: true, 23: true };
    const { container, getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ mockFavById } />,
    );

    const heading = getByRole(/heading/i);
    expect(heading).toBeInTheDocument();
    const tagH2 = container.querySelectorAll('h2');
    expect(tagH2).toHaveLength(1);
    const subTitle = getByText(/(Encountered) (pokémons)/i);
    expect(subTitle).toBeInTheDocument();
  });

  test(`There is a button with the following behaviors:
      1st: a button "Próximo pokémon" is shown`, () => {
    const mockFavById = { 23: true, 25: true };
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ data } isPokemonFavoriteById={ mockFavById } />,
    );

    const button = getByRole('button', { name: /(Próximo) (pokémon)/i });
    expect(button).toBeInTheDocument();
  });

  test('2nd: on click, one by one, all pokémons may be shown', () => {
    const mockFavById = { 23: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    mockPokemons.forEach((element) => {
      const { name } = element;
      const pokeElement = getByText(name);
      expect(pokeElement).toBeInTheDocument();
      fireEvent.click(getByRole('button', { name: /(Próximo) (pokémon)/i }));
    });
  });

  test('3rd: on click at the last pokémon the first one may be shown', () => {
    const mockFavById = { 23: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    mockPokemons.forEach((index, array) => {
      fireEvent.click(getByRole('button', { name: /(Próximo) (pokémon)/i }));
      if (index === array.length - 1) {
        const { name } = array[0];
        const pokeElement = getByText(name);
        expect(pokeElement).toBeInTheDocument();
      }
    });
  });

  test('There is ONLY one Pokemon is shown', () => {
    const mockFavById = { 23: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const { getByTestId } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    const pokeElement = getByTestId(/pokemon-name/i);
    expect(pokeElement).toBeInTheDocument();
  });

  test(`There are "filter" buttons with the following behaviors:
      1st: on click, filtered type is shown`, () => {
    const mockFavById = { 78: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const mockTypes = [...new Set(mockPokemons
      .reduce((types, { type }) => [...types, type], []))];
    const mockPokesByTypes = (hereType) => mockPokemons
      .filter((pokemon) => hereType
        .includes(pokemon.type));

    const { getByText, getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    mockTypes.forEach((type) => {
      fireEvent.click(getByRole('button', { name: type }));
      mockPokesByTypes(type).forEach((element) => {
        const { name } = element;
        const pokeElement = getByText(name);
        expect(pokeElement).toBeInTheDocument();
        fireEvent.click(getByRole('button', { name: /(Próximo) (pokémon)/i }));
      });
    });
  });

  test('2rd: the pokémon shown must be corresponding to clicked type', () => {
    const mockFavById = { 78: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const mockTypes = [...new Set(mockPokemons
      .reduce((types, { type }) => [...types, type], []))];

    const { getAllByTestId, getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    mockTypes.forEach((type) => {
      const pokeType = getByRole('button', { name: type });
      expect(pokeType).toBeInTheDocument();
      const pokeTypeButton = getAllByTestId(/(pokemon-type-button)/i);
      expect(pokeTypeButton).toHaveLength(mockTypes.length);
    });
  });

  test(`There is a "reset filter" button with the following behaviors:
      1st: its text should be "all`, () => {
    const mockFavById = { 23: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const { getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );
    const filterRole = getByRole('button', { name: /all/i });
    expect(filterRole).toBeInTheDocument();
  });

  test('2rd: when "All" is clicked the filtering will be disabled', () => {
    const mockFavById = { 78: true, 25: true, 4: false };
    const mockById = Object.keys(mockFavById).map((key) => parseInt(key, 10));
    const mockPokemons = data.filter((pokemon) => mockById.includes(pokemon.id));
    const mockTypes = [...new Set(mockPokemons
      .reduce((types, { type }) => [...types, type], []))];

    const { container, getByRole } = renderWithRouter(
      <Pokedex pokemons={ mockPokemons } isPokemonFavoriteById={ mockFavById } />,
    );

    fireEvent.click(getByRole('button', { name: /all/i }));
    const classButton = container.querySelectorAll('.filter-button');
    expect(classButton).toHaveLength(mockTypes.length + 1);
  });

  test('3rd: "All" may be the selected filter when loaded', () => {
    // need to test the state. how?
  });

  test(`There are "filter buttons" dinamicaly created:
      1st: they must be dinamically created`, () => {
    // need to test the state. how?
  });

  test('2nd: One button for each type must be created', () => {
    // need to test the state. how?
  });

  test('3rd: "All" may be created in addition to type filters', () => {
    // need to test the state. how?
  });

  test('The button "Próximo Pokemon", must be disabled when only one is filtered', () => {
    // need to test the state. how?
  });
});
